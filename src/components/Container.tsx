'use client'

import React, { useState, useEffect, useRef } from 'react';
import UserBubble from './bubbles/UserBubble';
import GptBubble from './bubbles/GptBubble';
import InputNomal from './inputs/InputNomal';

import TypingIndicator from './bubbles/TypingIndicator';
import SystemUpdate from './loadingPages/SystemUpdate'
import NoSelectedProject from './loadingPages/NoSelectedProject';
import RecommendedValue from './loadingPages/recommend/RecommendedValue';

import { useActiveItemContext } from './dropDown/ActiveItemContext';
import { useGetApiContext } from './dropDown/GetApiContext';

const Container: React.FC = () => {
    const { selectedProject } = useActiveItemContext();
    const { getApi } = useGetApiContext();
    const [messages, setMessages] = useState<{ type: string, text: string, sources?: any[]}[]>([]);
    const [loading, setLoading] = useState(false); 
    const [typingComplete, setTypingComplete] = useState(true);

    const addUserMessage = (message: string) => {
        setMessages((prevMessages) => [...prevMessages, { type: 'human', text: message }]);
    };

    const addGptMessage = (message: string, sources: any[]) => {
        setMessages((prevMessages) => [...prevMessages, { type: 'ai', text: message, sources}]);
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
        <div className='flex-grow flex flex-col ml-[336px] mt-[83px]'>
                <div className="flex-grow flex-col overflow-y-auto">
                    {getApi ? (
                                selectedProject === null ? (
                                    <div className="w-full h-full flex justify-center items-center">
                                        <NoSelectedProject />
                                    </div>
                                    ) : (
                                        <>
                                            {messages.length === 0 ? (
                                                <RecommendedValue />
                                            ) : (
                                                <>
                                                    {messages.map((message, index) => 
                                                        message.type === 'human' ? (
                                                            <UserBubble key={index} userText={message.text} />
                                                        ) : (
                                                            <GptBubble 
                                                                key={index} 
                                                                gptText={message.text} 
                                                                sources={message.sources || []} 
                                                                setTypingComplete={setTypingComplete}/>
                                                        )
                                                    )}
                                                    {loading && <TypingIndicator />} {/* 로딩 중이면 typingIndicator 렌더링 */}
                                                </>
                                            )}
                                        </>
                                    )
                            ) : (
                                <SystemUpdate />
                            )}
                            <div ref={messagesEndRef} />
            </div>
            <div className='w-full fixed bottom-0 right-0'>
                <InputNomal addUserMessage={addUserMessage} 
                            addGptMessage={(message, sources) => addGptMessage(message, sources)} 
                            setLoading={setLoading} 
                            loading={loading}
                            typingComplete={typingComplete}/>
            </div>
        </div>
    );
};

export default Container;
