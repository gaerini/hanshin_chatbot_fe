import React from 'react';

interface PdfDataProps {
    number: string;
    pdfName : string;
}

const PdfData: React.FC<PdfDataProps> = ({ number, pdfName }) => {
    return (
            <div className="self-stretch pl-7 justify-start items-center gap-2 inline-flex">
                <p className="text-neutral-500 text-caption">{number}</p>
                <button className="text-neutral-500 text-caption underline">{pdfName}</button>
            </div>
    );
};

export default PdfData;