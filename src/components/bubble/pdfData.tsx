import React from 'react';

interface PdfDataProps {
    number: string; //발췌 N = 발췌+{referencePdf.id} 형식으로 쓸수도잇고
    pdfName : string; //
    pdfPath : string;
}

const PdfData: React.FC<PdfDataProps> = ({ number, pdfName, pdfPath }) => {
    return (
            <div className="self-stretch pl-7 justify-start items-center gap-4 inline-flex">
                <div className="p-1 rounded-md text-neutral-400 text-caption bg-neutral-100">{number}</div>
                <a href={pdfPath} download>
                    <button className="text-neutral-500 text-paragraph-s hover:font-bold gap-1 inline-flex"><p>{pdfName}</p> </button>
                </a>
            </div>
    );
};

export default PdfData;