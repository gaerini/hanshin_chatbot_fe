" use client ";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import PdfBubble from "./PdfBubble";
import Icon from "../icon/Icon";

interface GptBubbleProps {
  gptText: string;
  sources: { source: string; page: number }[];
  setTypingComplete: (value: boolean) => void;
}

const GptBubble: React.FC<GptBubbleProps> = ({
  gptText,
  sources,

  setTypingComplete,
}) => {

  // {gptText}의 타이핑효과
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentText = "";
    let caseIndex = 0;

    const intervalId = setInterval(() => {
      if (caseIndex < gptText.length) {
        setTypingComplete(false)
        currentText += gptText[caseIndex];
        setDisplayedText(currentText);
        caseIndex++;
      } else {
        clearInterval(intervalId);
        setTypingComplete(true);
      }
    }, 6); // Adjust typing speed here

    return () => clearInterval(intervalId);
  }, [gptText, setTypingComplete]);



  return (
    <div className="w-full px-4 flex-col justify-start items-center inline-flex mb-4 gap-2.5">
      <div
        className={`w-full p-4 rounded-[10px] flex-col justify-start items-start gap-2 inline-flex`}
      >
        <div className="justify-start items-center gap-2 inline-flex">
          <div className="w-[32px] h-[32px] rounded-full shadow-md bg-neutral-white border border-neutral-300 items-center justify-center inline-flex">
            <Icon name="buildnow" width={24} height={24} />
          </div>
          <div className="text-neutral-400 text-paragraph-l font-bold">
            빌드나우 AI 챗봇
          </div>
        </div>
        <div className="w-full pl-10 pr-2.5 py-2.5 bg-white flex-col justify-start items-start gap-4 inline-flex text-paragraph-chatBot">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
            {displayedText}
          </ReactMarkdown>
          {displayedText.length === gptText.length &&
            gptText !== "주어진 서류에서 답변을 찾을 수 없습니다." && (
              <PdfBubble sources={sources} />
            )}
        </div>
      </div>
    </div>
  );
};

export default GptBubble;
