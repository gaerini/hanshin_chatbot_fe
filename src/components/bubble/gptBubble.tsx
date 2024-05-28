import React from 'react';
import PdfBubble from './pdfBubble';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import Icon from '../icon/icon';

interface GptBubbleProps {
    gptText: string;
}

const GptBubble: React.FC<GptBubbleProps> = ({ gptText }) => {
    return (
        <div className='w-full p-8 flex-col justify-start items-start gap-2 inline-flex'>
            <div className='justify-start items-center gap-2 inline-flex'>
                <div className="w-[32px] h-[32px] rounded-full shadow-md border border-neutral-300 items-center justify-center inline-flex">
                    <Icon name="hanshin"
                        width={24}
                        height={24}/>
                </div>
                <div className="text-neutral-400 text-paragraph-l font-bold">한신공영 AI 챗봇</div>
            </div>
            <div className="w-full pl-10 pr-2.5 py-2.5 bg-white flex-col justify-start items-start gap-4 inline-flex text-paragraph-chatBot">
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                    {gptText}
                </ReactMarkdown>
                <PdfBubble/>
            </div>

        </div>
    );
};

export default GptBubble;