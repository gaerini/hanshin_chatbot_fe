import React from 'react';

interface PdfDataProps {
    number: string; //발췌 N = 발췌+{referencePdf.id} 형식으로 쓸수도잇고
    pdfName : string; //
    pdfPath : string;
}

const PdfData: React.FC<PdfDataProps> = ({ number, pdfName, pdfPath }) => {
    return (
            <div className="self-stretch pl-7 justify-start items-center gap-4 inline-flex">
                <div className="w-auto p-1 rounded-md whitespace-nowrap
                                text-neutral-400 text-caption bg-neutral-100
                               dark:text-neutral-300 dark:bg-neutral-500">{number}</div>
                <a href={pdfPath} download>
                    <button className="text-neutral-500 dark:text-neutral-300 text-paragraph-s hover:font-bold gap-1 inline-flex text-left">{pdfName}</button>
                </a>
            </div>
    );
};

export default PdfData;