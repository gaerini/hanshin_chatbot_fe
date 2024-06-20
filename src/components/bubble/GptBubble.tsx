" use client ";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import PdfBubble from "./PdfBubble";
import Icon from "../icon/Icon";
import ProjectBadge from "../dropDown/ProjectBadge";

interface GptBubbleProps {
  gptText: string;
  sources: { source: string; page: number }[];
  badgeProject: string | null ;
  setTypingComplete: (value: boolean) => void;
}

const GptBubble: React.FC<GptBubbleProps> = ({
  gptText,
  sources,
  badgeProject,
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

  // badgeProject에 따라 배경 색 클래스를 결정하는 함수
  const getBackgroundColorClass = (project: string | null) => {
    switch (project) {
      case "용산 한강로3가":
        return "bg-neutral-100 dark:bg-neutral-800";
      case "양산 평산동":
        return "bg-blue-100 dark:bg-neutral-700";
      default:
        return "";
    }
  };

  const reviewFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSd51XBTcrer7n0CKhPjo5FjsZ4a83IGqJINX3Zxjlr8MoLbEQ/viewform";
    const openPaeperLiskLink = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.open(reviewFormLink, "_blank");
      };


  return (
    <div className="w-full px-4 flex-col justify-start items-center inline-flex mb-4 gap-2.5">
      <div
        className={`w-full p-4 rounded-[10px] flex-col justify-start items-start gap-2 inline-flex ${getBackgroundColorClass(
          badgeProject
        )}`}
      >
        <div className="justify-start items-center gap-2 inline-flex">
          <div className="w-[32px] h-[32px] rounded-full shadow-md bg-neutral-white border border-neutral-300 items-center justify-center inline-flex">
            <Icon name="buildnow" width={24} height={24} />
          </div>
          <div className="text-neutral-400 text-paragraph-l font-bold">
            빌드나우 AI 챗봇
          </div>
          <ProjectBadge badgeProject={badgeProject} />
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
      <button className="text-center text-caption font-medium textBtnStyle"
              onClick={openPaeperLiskLink}>
        🤝 더 똑똑해질 빌드챗을 위해, 소중한 사용 후기를 공유해주세요!
      </button>
    </div>
  );
};

export default GptBubble;
