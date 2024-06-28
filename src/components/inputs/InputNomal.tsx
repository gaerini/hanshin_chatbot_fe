"use client";
import React, { useState, useRef, useEffect } from "react";
import Icon from "../icon/Icon";
import { useActiveItemContext } from "../dropDown/ActiveItemContext";
import { useGetApiContext } from "../dropDown/GetApiContext";
import { useChooseRecommendContext } from "../layoutComponents/loadingPages/recommend/ChooseRecommendContext";

interface InputNomalProps {
  addUserMessage: (message: string) => void;
  addGptMessage: (
    message: string,
    sources: any[],
    badgeProject?: string | null
  ) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
  typingComplete: boolean;
}

const InputNomal: React.FC<InputNomalProps> = ({
  addUserMessage,
  addGptMessage,
  setLoading,
  loading,
  typingComplete,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [memoryId, setMemoryId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxHeight = 250;
  const minHeight = "3.5rem";
  const isSending = useRef(false);

  const { selectedProjectForChat } = useActiveItemContext();
  const { getApi } = useGetApiContext();
  const { recommendedValue } = useChooseRecommendContext();

  //api loading
  const updateLoading = (loading: boolean) => {
    setLoading(loading);
  };

  //textarea 영역 높이 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = minHeight;
    }
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    setInputValue(value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  // 추천질문 클릭시 value 전달 및 자동 전송
  useEffect(() => {
    if (recommendedValue) {
      setInputValue(recommendedValue);
    }
  }, [recommendedValue]);
  useEffect(() => {
    if (recommendedValue && inputValue === recommendedValue) {
      handleSend();
    }
  }, [inputValue, recommendedValue]);

  //전송 함수
  const handleSend = async () => {
    if (isSending.current) {
      setInputValue("");
      return;
    }
    isSending.current = true;

    if (!inputValue.trim()) {
      alert("내용을 입력해주세요.");
      isSending.current = false;
      return;
    }
    if (!selectedProjectForChat) {
      alert("프로젝트를 선택해주세요.");
      isSending.current = false;
      return;
    }

    addUserMessage(inputValue);
    setInputValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setLoading(true); 

    try {
      const initialResult = await sendRequest(inputValue);

      if (
        initialResult.answer &&
        initialResult.answer.includes(
          "찾으시는 내용을 주어진 서류에서 찾지 못했습니다."
        )
      ) {
        const modifiedQuery = `${selectedProjectForChat} 현장 ${inputValue}`;
        const modifiedResult = await sendRequest(modifiedQuery);

        addGptMessage(
          modifiedResult.answer,
          modifiedResult.sources,
          modifiedResult.project_name
        );

        if (modifiedResult.memory_id) {
          setMemoryId(modifiedResult.memory_id);
        }
      } else {
        addGptMessage(
          initialResult.answer,
          initialResult.sources,
          initialResult.project_name
        );

        if (initialResult.memory_id) {
          setMemoryId(initialResult.memory_id);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      isSending.current = false;
    }
  };
  //키보드로 전송
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  //Api-post
  const sendRequest = async (query: string) => {
    const token = localStorage.getItem("access_token");
    
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    console.log(token);

    const requestBody = {
      query,
      project_name: selectedProjectForChat,
      memory_id: memoryId,
    };

    const response = await fetch(
      "https://port-0-hanshin-chatbot-be-1272llwsz1ihz.sel5.cloudtype.app/chat",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      }
    );

    console.log(response);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  return (
    <div className="w-full flex justify-start items-center bg-neutral-white dark:bg-neutral-black">
      <div className="w-full p-4 justify-start items-start flex">
        <textarea
          className={`flex-grow pl-4 pr-3 py-3.5 rounded-tl-2xl rounded-bl-2xl border-l border-t border-b justify-center items-center resize-none 
                      text-paragraph-l
                    ${
                      !getApi
                        ? "inputStyle-disabled"
                        : "inputStyle-default"
                    }`}
          style={{
            minHeight: minHeight,
            maxHeight: `${maxHeight}px`,
            overflow: inputValue ? "auto" : "hidden",
          }}
          placeholder={
            selectedProjectForChat
              ? `${selectedProjectForChat} 현장에 대해 무엇이든 물어보세요`
              : "무엇이든 물어보세요"
          }
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
          rows={1}
          disabled={!getApi}
        />

        <div
          className={`flex w-[60px] px-3 rounded-tr-2xl rounded-br-2xl border-r border-t border-b justify-center items-end
                    border-neutral-200 dark:border-neutral-800 grow-0
                    ${
                      !getApi 
                        ? "bg-neutral-100 dark:bg-neutral-700"
                        : "bg-neutral-white text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                    }`}
          style={{
            minHeight: minHeight,
            maxHeight: `${maxHeight}px`,
            height: textareaRef.current
              ? textareaRef.current.style.height
              : "auto",
          }}>
          <button
            className={`w-8 h-8 my-[0.7rem] justify-center items-center inline-flex btnStyle-s
                        ${
                          !getApi || loading || !typingComplete
                            ? "blueBtnStyle-disabled"
                            : "blueBtnStyle-default hover:blueBtnStyle-hover"
                        }`}
            onClick={handleSend}
            disabled={!getApi || loading || !typingComplete}
          >
            <Icon name="sendMessage" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputNomal;