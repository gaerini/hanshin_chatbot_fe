import React from 'react';

interface PdfDataProps {
    number: string;
    pdfName: string;
    pdfPath: string;
}

const PdfData: React.FC<PdfDataProps> = ({ number, pdfName, pdfPath }) => {
    return (
        <div className="flex w-full pl-7 justify-start items-center gap-3 ">
            <div className="flex-shrink-0 w-auto p-1 rounded-md text-neutral-400 text-caption bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-500 whitespace-nowrap">
                {number}
            </div>
            <a href={pdfPath} download className="flex-grow justify-start items-center overflow-hidden">
                <button className="w-full text-neutral-500 dark:text-neutral-300 text-paragraph-s text-left hover:font-bold gap-1 truncate">
                    {pdfName}
                </button>
            </a>
        </div>
    );
};

export default PdfData;
