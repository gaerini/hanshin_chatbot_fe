import React from "react";

interface PdfDataProps {
  number: string; //발췌 N = 발췌+{referencePdf.id} 형식으로 쓸수도잇고
  pdfName: string; //
  pdfPath: string;
}

const PdfData: React.FC<PdfDataProps> = ({ number, pdfName, pdfPath }) => {
  return (
    <div className="self-stretch pl-7 justify-start items-center gap-2 inline-flex h-8">
      <p className="text-neutral-500 text-caption">{number}</p>
      <a href={pdfPath} target="_blank" rel="noopener noreferrer" className="flex items-center">
        <button className="text-neutral-500 text-caption underline hover:font-bold">
          {pdfName}
        </button>
      </a>
    </div>
  );
};

export default PdfData;
