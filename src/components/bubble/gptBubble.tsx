' use client '

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import PdfBubble from './pdfBubble';
import Icon from '../icon/icon';
import ProjectBadge from '../dropDown/projectBadge';

interface GptBubbleProps {
    gptText: string;
}

const GptBubble: React.FC<GptBubbleProps> = ({ gptText }) => {
    
    // {gptText}의 타이핑효과
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let currentText = '';
        let index = 0;

        const intervalId = setInterval(() => {
            if (index < gptText.length) {
                currentText += gptText[index];
                setDisplayedText(currentText);
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, 50); // Adjust typing speed here

        return () => clearInterval(intervalId);
    }, [gptText]);

    return (
        <div className='w-full p-4 flex-col justify-start items-start gap-2 inline-flex'>
            <div className='justify-start items-center gap-2 inline-flex'>
                <div className="w-[32px] h-[32px] rounded-full shadow-md border border-neutral-300 items-center justify-center inline-flex">
                    <Icon name="hanshin"
                        width={24}
                        height={24}/>
                </div>
                <div className="text-neutral-400 text-paragraph-l font-bold">한신공영 AI 챗봇</div>
                <ProjectBadge />
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