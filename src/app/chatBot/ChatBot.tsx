"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import UserBubble from "@/components/utilityComponents/chatbotComponents/bubbles/UserBubble";
import GptBubble from "@/components/utilityComponents/chatbotComponents/bubbles/GptBubble";
import InputNomal from "@/components/utilityComponents/InputNomal";

import TypingIndicator from "@/components/utilityComponents/chatbotComponents/bubbles/TypingIndicator";
import SystemUpdate from "@/components/utilityComponents/loadingPages/SystemUpdate";
import NoSelectedProject from "@/components/utilityComponents/loadingPages/NoSelectedProject";
import RecommendedValue from "@/components/utilityComponents/loadingPages/recommend/RecommendedValue";

import { useActiveItemContext } from "@/components/utilityComponents/dropDown/ActiveItemContext";
import { useGetApiContext } from "@/components/utilityComponents/dropDown/GetApiContext";

interface ChatBotProps {
  isSidebarOpen: boolean;
  selectedMemoryId: string | null;
  searchParams: { [key: string]: string | undefined };
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
}) => {
  const { selectedProjectForChat } = useActiveItemContext();
  const { getApi } = useGetApiContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [typingComplete, setTypingComplete] = useState(true);
  const [messagesFetched, setMessagesFetched] = useState(false);

  const router = useRouter();
  // const searchParams = useSearchParams();
  const pathname = usePathname();

  const addUserMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "human", text: message },
    ]);
  };
  const addGptMessage = (message: string, sources: any[]) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "ai", text: message, sources },
    ]);
  };

  //sideBar에서 선택한 memoryId log 불러와서 bubble로 렌더링
  const fetchMessagesForMemoryId = async (memoryId: string) => {
    console.log("Fetching messages for memoryId:", memoryId);
    setMessagesFetched(false);
    try {
      // API 호출하여 해당 memoryId의 대화 내용 불러오기
      const response = await fetch(
        `https://port-0-hanshin-chatbot-be-1272llwsz1ihz.sel5.cloudtype.app/chat-history/${memoryId}`
      );
      const data = await response.json();
      console.log("API response data:", data);
      const formattedMessages = data.map((message: string) => {
        const isHuman = message.startsWith("HumanMessage:");
        return {
          type: isHuman ? "human" : "ai",
          text: message
            .replace("HumanMessage: ", "")
            .replace("AIMessage: ", ""),
        };
      });
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
                <UserBubble key={index} userText={message.text} />
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
        />
      </div>
    </div>
  );
};

export default ChatBot;
