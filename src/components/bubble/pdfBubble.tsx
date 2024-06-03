import React from "react";
import Icon from "../icon/icon";
import PdfData from "./pdfData";
import { decode } from "punycode";

interface PdfBubbleProps {
  sources: { source: string; page: number }[];
}

const PdfBubble: React.FC<PdfBubbleProps> = ({ sources }) => {
  const extractFilePathAndName = (fullPath: string) => {
    const decodedFullPath = decodeURIComponent(fullPath);
    const segments = decodedFullPath.split("/");
    const fileName = segments[segments.length - 1];
    const filePath = fullPath;
    return { fileName, filePath };
  };

  return (
    <div className="w-full p-4 rounded-[10px] flex-col justify-start items-end gap-4 inline-flex
                  bg-neutral-white border border-neutral-200
                  dark:bg-neutral-600 dark:border-neutral-600">
      <div className="self-stretch justify-start items-center gap-2 inline-flex fill-neutral-500 dark:fill-neutral-300">
        <Icon name="speaker" width={16} height={16} />
        <div className="grow shrink basis-0 text-neutral-500 dark:text-neutral-300 text-paragraph-m font-semibold">
          해당 내용의 출처가 되는 서류를 살펴보시겠어요?
        </div>
      </div>
      <div className="w-full flex-col justify-start items-end inline-flex gap-[-2px]">
        {sources.map((source, index) => {
          const { fileName, filePath } = extractFilePathAndName(source.source);
        
          return (
            <PdfData
              key={index}
              number={`발췌 ${index + 1}`}
              pdfName={`${fileName} 의 ${source.page}p`}
              pdfPath={filePath}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PdfBubble;
