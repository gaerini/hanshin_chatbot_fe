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
    sources: { source: string, page: number }[];
    badgeProject: string | null;
}

const GptBubble: React.FC<GptBubbleProps> = ({ gptText, sources, badgeProject }) => {
    //console.log('GptBubble received badgeProject:', badgeProject);
    
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

     // badgeProject에 따라 배경 색 클래스를 결정하는 함수
     const getBackgroundColorClass = (project: string | null) => {
        switch (project) {
            case '용산 에피소드':
                return 'bg-neutral-100';
            case '양산 평산동':
                return 'bg-blue-100';
            default:
                return '';
        }
    };

    return (
        <div className={`w-full p-4 rounded-2xl flex-col justify-start items-start gap-2 inline-flex ${getBackgroundColorClass(badgeProject)}`}>
            <div className='justify-start items-center gap-2 inline-flex'>
                <div className="w-[32px] h-[32px] rounded-full shadow-md bg-neutral-white border border-neutral-300 items-center justify-center inline-flex">
                    <Icon name="hanshin"
                        width={24}
                        height={24}/>
                </div>
                <div className="text-neutral-400 text-paragraph-l font-bold">한신공영 AI 챗봇</div>
                <ProjectBadge badgeProject={badgeProject}/>
            </div>
            <div className="w-full pl-10 pr-2.5 py-2.5 bg-white flex-col justify-start items-start gap-4 inline-flex text-paragraph-chatBot">
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                    {displayedText}
                </ReactMarkdown>
                 {displayedText.length === gptText.length && <PdfBubble sources={sources}/>}
            </div>

        </div>
    );
};

export default GptBubble;