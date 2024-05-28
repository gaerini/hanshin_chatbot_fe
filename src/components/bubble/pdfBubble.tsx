import React from 'react';
import Icon from '../icon/icon';
import PdfData from './pdfData';


const PdfBubble: React.FC = () => {
    return (
        <div className="w-full p-4 bg-neutral-100 rounded-[10px] flex-col justify-start items-end gap-4 inline-flex">
            <div className="self-stretch justify-start items-center gap-2 inline-flex fill-neutral-500">
                <Icon name = "speaker" width={16} height={16} />
                 <div className="grow shrink basis-0 text-neutral-500 text-paragraph-m font-semibold">해당 내용의 출처가 되는 서류를 살펴보시겠어요?</div>
            </div>
            <div className="w-full flex-col justify-start items-end gap-2 inline-flex">
                <PdfData number='발췌 1' pdfName='어쩌고.pdf'/>
                <PdfData number='발췌 2' pdfName='어쩌고저쩌고.pdf'/>
            </div>
        </div>
    );
};

export default PdfBubble;