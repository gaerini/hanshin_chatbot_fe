'use client'
import React, { useState, useRef } from 'react';
import Icon from '../icon/icon';

interface InputNomalProps {
    addUserMessage: (message: string) => void;
}

const InputNomal: React.FC<InputNomalProps> = ({ addUserMessage }) => {
    const [inputValue, setInputValue] = useState('');
    const [textareaHeight, setTextareaHeight] = useState('auto');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const maxHeight = 250;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);

        if (textareaRef.current) {
            textareaRef.current.style.height ='auto';
            const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
            textareaRef.current.style.height = `${newHeight}px`;
        }
    };

    //버튼으로 보내기
    const handleSend = () => {
        if (inputValue.trim()) {
            addUserMessage(inputValue);
            setInputValue('');
            if (textareaRef.current) {
                textareaRef.current.style.height ='auto';
            }
        }
    };

    //enter키로 보내기
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };


    return (
        <div className="w-full bg-neutral-white-opacity-80 backdrop-blur-[10px] 
                        flex justify-center items-center fixed bottom-0 z-10">
            <div className="max-w-[768px] w-full p-4 
                            justify-start items-start inline-flex">
                <textarea className="grow shrink basis-0 pl-4 pr-3 py-4 bg-neutral-white 
                                    rounded-tl-2xl rounded-bl-2xl border-l border-t border-b border-neutral-300 
                                    justify-start items-center flex resize-none
                                    text-paragraph-l text-neutral-700 focus:outline-none"
                          style={{ height: textareaHeight, maxHeight: `${maxHeight}px`, overflow: inputValue ? 'auto' : 'hidden' }}
                          placeholder="무엇이든 물어보세요"
                          value={inputValue}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          ref={textareaRef}
                          rows={1}
                        />

                <div className="w-[60px] pl-4 pr-3 py-2.5 bg-neutral-white 
                                rounded-tr-2xl rounded-br-2xl border-r border-t border-b border-neutral-300 
                                justify-start items-end flex"
                     style={{ height: textareaRef.current ? textareaRef.current.style.height : 'auto' }}>
                    <button className="w-8 h-8 blueBtnStyle-s"
                            onClick={handleSend}>
                        <Icon name="sendMessage" 
                                  width={20} 
                                  height={20}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputNomal;