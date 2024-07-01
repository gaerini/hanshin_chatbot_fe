"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import UserBubble from "../../chatbotComponents/bubbles/UserBubble";
import GptBubble from "../../chatbotComponents/bubbles/GptBubble";
import InputNomal from "../../inputs/InputNomal";

import TypingIndicator from "../../chatbotComponents/bubbles/TypingIndicator";
import SystemUpdate from "../loadingPages/SystemUpdate";
import NoSelectedProject from "../loadingPages/NoSelectedProject";
import RecommendedValue from "../loadingPages/recommend/RecommendedValue";

import { useActiveItemContext } from "../../dropDown/ActiveItemContext";
import { useGetApiContext } from "../../dropDown/GetApiContext";

interface ChatBotProps {
  isSidebarOpen: boolean;
  selectedMemoryId: string | null;
  searchParams: { [key: string]: string | undefined };
  isLearning: boolean; // 추가된 부분
}

interface Message {
  type: string;
  text: string;
  sources?: any[];
}

const ChatBot: React.FC<ChatBotProps> = ({
  isSidebarOpen,
  selectedMemoryId,
  searchParams,
  isLearning, // 추가된 부분
}) => {
  const { selectedProjectForChat } = useActiveItemContext();
  const { getApi } = useGetApiContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [typingComplete, setTypingComplete] = useState(true);
  const [messagesFetched, setMessagesFetched] = useState(false);

  const [lastUserMessageIndex, setLastUserMessageIndex] = useState<
    number | null
  >(null); // 추가된 부분
  const [feedbackIndex, setFeedbackIndex] = useState<number | null>(null); // 피드백 인덱스 추가

  const router = useRouter();
  // const searchParams = useSearchParams();
  const pathname = usePathname();

  const addUserMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "human", text: message },
    ]);
    if (isLearning) {
      setFeedbackIndex(messages.length); // 새로운 피드백 메시지 인덱스 설정
    }
  };
  const addGptMessage = (message: string, sources: any[]) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "ai", text: message, sources },
    ]);
  };

  //쿠키에서 값을 가져오는 함수
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  //sideBar에서 선택한 memoryId log 불러와서 bubble로 렌더링
  const fetchMessagesForMemoryId = async (memoryId: string) => {
    console.log("Fetching messages for memoryId:", memoryId);
    setMessagesFetched(false);
    const token = getCookie("access_token");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    try {
      // API 호출하여 해당 memoryId의 대화 내용 불러오기
      const response = await fetch(
        `https://port-0-hanshin-chatbot-be-1272llwsz1ihz.sel5.cloudtype.app/chat-history/${memoryId}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const data = await response.json();
      console.log("API response data:", data);
      const formattedMessages = data.conversation_list.map(
        (message: string) => {
          const isHuman = message.startsWith("HumanMessage:");
          return {
            type: isHuman ? "human" : "ai",
            text: message
              .replace("HumanMessage: ", "")
              .replace("AIMessage: ", ""),
          };
        }
      );
      setMessages(formattedMessages);
      setMessagesFetched(true);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]); // 에러 발생 시 빈 배열로 초기화
      setMessagesFetched(false);
    }
  };

  useEffect(() => {
    if (selectedMemoryId) {
      fetchMessagesForMemoryId(selectedMemoryId);
    }
  }, [selectedMemoryId]);

  useEffect(() => {
    // 학습 상태가 변경될 때마다 마지막 사용자 메시지 인덱스 업데이트
    if (isLearning) {
      const lastUserMessageIndex =
        messages
          .map((msg, idx) => (msg.type === "human" ? idx : -1))
          .filter((idx) => idx !== -1)
          .pop() ?? null;
      setLastUserMessageIndex(lastUserMessageIndex);
      console.log("마지막 메시지 :", lastUserMessageIndex);
    }
  }, [isLearning]);

  //신규 메세지에 포커스 -> 스크롤 아래로 내리기 함수
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // URL 쿼리 업데이트 함수
  const updateQuery = (project: string | null, memoryId: string | null) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    const currentProject = searchParams?.project || null;
    const currentMemoryId = searchParams?.memoryId || null;

    if (currentProject === project && currentMemoryId === memoryId) return;

    if (project !== null) {
      params.set("project", project);
    } else {
      params.delete("project");
    }

    if (memoryId !== null) {
      params.set("memoryId", memoryId);
    } else {
      params.delete("memoryId");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // selectedProjectForChat 또는 selectedMemoryId가 변경될 때마다 URL 업데이트
  useEffect(() => {
    updateQuery(selectedProjectForChat, selectedMemoryId);
  }, [selectedProjectForChat, selectedMemoryId]);

  return (
    <div className="flex-grow flex flex-col h-full items-center mb-[80px]">
      <div className="w-full flex-grow flex-col overflow-y-auto h-full">
        {getApi === false ? (
          <SystemUpdate />
        ) : selectedProjectForChat === null ? (
          <div className="w-full h-full flex justify-center items-center">
            <NoSelectedProject />
          </div>
        ) : messages.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <RecommendedValue />
          </div>
        ) : (
          <>
            {messages.map((message, index) =>
              message.type === "human" ? (
                <UserBubble
                  key={index}
                  userText={message.text}
                  isLastHuman={
                    (isLearning && index === lastUserMessageIndex) ||
                    (isLearning && index === feedbackIndex)
                  } // 추가된 부분
                />
              ) : (
                <GptBubble
                  key={index}
                  gptText={message.text}
                  sources={message.sources || []}
                  setTypingComplete={setTypingComplete}
                  messagesFetched={messagesFetched}
                />
              )
            )}
            {loading && <TypingIndicator />}{" "}
            {/* 로딩 중이면 typingIndicator 렌더링 */}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div
        className={`fixed bottom-0
                                ${
                                  isSidebarOpen
                                    ? "pl-[336px] w-full right-0"
                                    : "max-w-[768px] w-full"
                                }`}
      >
        <InputNomal
          addUserMessage={addUserMessage}
          addGptMessage={(message, sources) => addGptMessage(message, sources)}
          setLoading={setLoading}
          loading={loading}
          typingComplete={typingComplete}
          isLearning={isLearning} // 추가된 부분
        />
      </div>
    </div>
  );
};

export default ChatBot;
