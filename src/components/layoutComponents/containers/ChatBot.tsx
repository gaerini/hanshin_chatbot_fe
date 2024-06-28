'use client'

import React, { useState, useEffect, useRef } from 'react';
import UserBubble from '../../chatbotComponents/bubbles/UserBubble';
import GptBubble from '../../chatbotComponents/bubbles/GptBubble';
import InputNomal from '../../inputs/InputNomal';

import TypingIndicator from '../../chatbotComponents/bubbles/TypingIndicator';
import SystemUpdate from '../loadingPages/SystemUpdate'
import NoSelectedProject from '../loadingPages/NoSelectedProject';
import RecommendedValue from '../loadingPages/recommend/RecommendedValue';

import { useActiveItemContext } from '../../dropDown/ActiveItemContext';
import { useGetApiContext } from '../../dropDown/GetApiContext';

interface ChatBotProps {
    isSidebarOpen: boolean;
    selectedMemoryId: string | null;
}

const ChatBot: React.FC<ChatBotProps> = ({ isSidebarOpen, selectedMemoryId }) => {
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

    // const fetchMessagesForMemoryId = async (memoryId: string) => {
    //     setLoading(true);
    //     // API 호출하여 해당 memoryId의 대화 내용 불러오기
    //     const response = await fetch(`/api/chat/memory/${memoryId}`);
    //     const data = await response.json();
    //     setMessages(data.messages);
    //     setLoading(false);
    // };

    // useEffect(() => {
    //     if (selectedMemoryId) { // 추가된 부분
    //         fetchMessagesForMemoryId(selectedMemoryId); // 추가된 부분
    //     }
    // }, [selectedMemoryId]); // 추가된 부분


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
        <div className='flex-grow flex flex-col h-full items-center'>
            <div className="w-full flex-grow flex-col overflow-y-auto h-full">
                    {getApi ? (
                                selectedProject === null ? (
                                    <div className="w-full h-full flex justify-center items-center">
                                        <NoSelectedProject />
                                    </div>
                                    ) : (
                                        <>
                                            {messages.length === 0 ? (
                                                <div className="w-full h-full flex justify-center items-center">
                                                    <RecommendedValue />
                                                </div>
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
            <div className={`fixed bottom-0
                                ${isSidebarOpen 
                                    ? 'pl-[336px] w-full right-0' 
                                    : 'max-w-[768px] w-full'}`}>
                <InputNomal addUserMessage={addUserMessage} 
                            addGptMessage={(message, sources) => addGptMessage(message, sources)} 
                            setLoading={setLoading} 
                            loading={loading}
                            typingComplete={typingComplete}/>
            </div>
        </div>
    );
};

export default ChatBot;
