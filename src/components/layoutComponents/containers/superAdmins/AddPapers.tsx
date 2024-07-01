import React, { useState } from "react";
import Icon from "../../../icon/Icon";
import InputFile from "@/components/inputs/InputFile";
import LargeHeader from "@/components/headers/LargeHeader";

interface AddPapersProps {
  selectedProject: string;
}

type PdfUrlsType = {
  [key: string]: string[];
};

const AddPapers: React.FC<AddPapersProps> = ({ selectedProject }) => {
  const [pdfUrls, setPdfUrls] = useState<PdfUrlsType>({});

  return (
    <div className="w-full flex-grow flex-col overflow-y-auto h-full">
      <div className="w-full flex-grow flex-col overflow-y-auto">
        <LargeHeader
          leftIconName="dots"
          label="프로젝트 관리"
          siteMap={`${selectedProject || ""} / 서류 추가하기`}
        />
        <div className="w-full p-4 justify-center items-start inline-flex">
          <InputFile
            label="파일 업로드"
            caption="챗봇이 학습할 프로젝트 계약 서류를 업로드 해주세요"
            value=""
            setPdfUrls={setPdfUrls}
          />
        </div>
      </div>
      <div className="w-full p-4 justify-end items-center gap-1 inline-flex">
        <button
          className="btnStyle-l blueBtnStyle-default hover:blueBtnStyle-hover active:blueBtnStyle-active
                          border border-neutral-200 gap-2"
        >
          <Icon name="plus" width={20} height={20} />
          서류추가 완료
        </button>
      </div>
    </div>
  );
};

export default AddPapers;
