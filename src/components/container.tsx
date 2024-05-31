'use client'

import React, { useState, useEffect, useRef } from 'react';
import UserBubble from './bubble/userBubble';
import GptBubble from './bubble/gptBubble';
import InputNomal from './input/inputNomal';
import TypingIndicator from './bubble/typingIndicator';

const Container: React.FC = () => {
    const [messages, setMessages] = useState<{ type: string, text: string, sources?: any[] }[]>([]);
    const [loading, setLoading] = useState(false); // 추가: 로딩 상태

    const addUserMessage = (message: string) => {
        setMessages((prevMessages) => [...prevMessages, { type: 'human', text: message }]);
    };

    const addGptMessage = (message: string, sources: any[]) => {
        setMessages((prevMessages) => [...prevMessages, { type: 'ai', text: message, sources }]);
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
        <div className='w-full flex justify-center items-center'>
            <div className="w-full max-w-[768px] mt-[83px] mb-[100px] h-full flex flex-col">
                <div className='flex-col flex-grow overflow-y-auto justify-start items-start inline-flex'>
                    {messages.map((message, index) => 
                        message.type === 'human' ? (
                            <UserBubble key={index} userText={message.text} />
                        ) : (
                            <GptBubble key={index} gptText={message.text} sources={message.sources || []} />
                        )
                    )}
                    {loading && <TypingIndicator />} {/* 로딩 중이면 typingIndicator 렌더링 */}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <InputNomal addUserMessage={addUserMessage} addGptMessage={addGptMessage} setLoading={setLoading}/>
        </div>
    );
};

export default Container;
