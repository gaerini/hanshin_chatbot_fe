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

interface Message {
    type: string;
    text: string;
    sources?: any[];
}

const ChatBot: React.FC<ChatBotProps> = ({ isSidebarOpen, selectedMemoryId }) => {
    const { selectedProject } = useActiveItemContext();
    const { getApi } = useGetApiContext();
    const [ messages, setMessages ] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false); 
    const [typingComplete, setTypingComplete] = useState(true);
    const [messagesFetched, setMessagesFetched] = useState(false);

    const addUserMessage = (message: string) => {
        setMessages((prevMessages) => [...prevMessages, { type: 'human', text: message }]);
    };
    const addGptMessage = (message: string, sources: any[]) => {
        setMessages((prevMessages) => [...prevMessages, { type: 'ai', text: message, sources}]);
    };

    const fetchMessagesForMemoryId = async (memoryId: string) => {
        console.log('Fetching messages for memoryId:', memoryId);
        setLoading(true);
        setMessagesFetched(false);
        try {
            // API 호출하여 해당 memoryId의 대화 내용 불러오기
            const response = await fetch(`https://port-0-hanshin-chatbot-be-1272llwsz1ihz.sel5.cloudtype.app/chat-history/${memoryId}`);
            const data = await response.json();
            console.log('API response data:', data);
            const formattedMessages = data.map((message: string) => {
                const isHuman = message.startsWith('HumanMessage:');
                return {
                    type: isHuman ? 'human' : 'ai',
                    text: message.replace('HumanMessage: ', '').replace('AIMessage: ', ''),
                };
            });
            setMessages(formattedMessages);
            setMessagesFetched(true);

        } catch (error) {
            console.error("Error fetching messages:", error);
            setMessages([]); // 에러 발생 시 빈 배열로 초기화
            setMessagesFetched(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        console.log('SelectedMemoryId changed:', selectedMemoryId);
        if (selectedMemoryId) {
            fetchMessagesForMemoryId(selectedMemoryId);
        }
    }, [selectedMemoryId]);


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
        <div className='flex-grow flex flex-col h-full items-center mb-[80px]'>
            <div className="w-full flex-grow flex-col overflow-y-auto h-full">
                {messagesFetched ? (  // messagesFetched 상태에 따라 렌더링 결정
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
                                            setTypingComplete={setTypingComplete}
                                            messagesFetched={messagesFetched}/>
                                    )
                                )}
                                {loading && <TypingIndicator />} {/* 로딩 중이면 typingIndicator 렌더링 */}
                            </>
                        )}
                    </>
                ) : (
                    selectedProject === null ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <NoSelectedProject />
                        </div>
                    ) : (
                        <SystemUpdate />
                    )
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
