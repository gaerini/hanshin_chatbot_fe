'use client'

import React, { useState, useEffect, useRef } from 'react';
import UserBubble from './bubble/userBubble';
import GptBubble from './bubble/gptBubble';
import InputNomal from './input/inputNomal';

const Container: React.FC = () => {
    const [messages, setMessages] = useState<{ type: string, text: string }[]>([
        { type: 'user', text: '안뇽하세옇ㅎㅎ' },
        { type: 'gpt', text: `근저당권 설정과 관련된 주요 사항을 요약하면 다음과 같습니다:
    1. **근저당권 설정 필요성**:
    - 차주는 본건 건물의 준공 후에도 미상환 대출원리금이 존재할 경우, 해당 담보채무를 담보하기 위해 본건 건물에 대한 근저당권을 설정해야 합니다.
    2. **근저당권 설정 절차**:
                                    - 대출이용기관이 요청하는 경우, 차주는 본건 건물에 대해 소유권보존등기 및 소유권이전등기를 완료한 직후, 공동 제1순위 근저당권(채권최고액: Tranche A 대출약정금의 120%)을 Tranche A 대주에게, 제2순위 근저당권(채권최고액: Tranche B 대출약정금의 120%)을 Tranche B 대주에게 설정해야 합니다.
                                    - 근저당권 설정에 필요한 모든 절차와 의무를 이행해야 합니다.
                                    3. **구체적인 사항**:
                                    - 근저당권 설정과 관련된 구체적인 사항은 별도의 근저당권설정계약에 따릅니다.
                                    4. **예외 사항**:
                                    - 본 조 제2항 및 제3항에도 불구하고, 특정 인허가 절차로 인해 추가적인 기부채납이 필요한 경우, 근저당권 설정이 필요하지 않을 수 있습니다.
                                    이 요약은 근저당권 설정과 관련된 주요 절차와 의무를 간략히 정리한 것입니다.` },
    ]);

    const addUserMessage = (message: string) => {
        setMessages([...messages, { type: 'user', text: message }]);
    };

    //신규 메세지에 포커스 -> 스크롤 아래로 내리기 함수
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="max-w-[768px] mt-[83px] mb-[100px] h-full flex flex-col">
            <div className='flex-col flex-grow overflow-y-auto justify-start items-start inline-flex'>
                {messages.map((message, index) => 
                    message.type === 'user' ? (
                        <UserBubble key={index} userText={message.text} />
                    ) : (
                        <GptBubble key={index} gptText={message.text} />
                    )
                )}
                <div ref={messagesEndRef} />
            </div>
            <InputNomal addUserMessage={addUserMessage} />
        </div>
    );
};

export default Container;
