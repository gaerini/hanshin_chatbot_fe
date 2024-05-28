'use client'
import React, { useState } from 'react';
import Icon from '../icon/icon';

interface InputNomalProps {
    addUserMessage: (message: string) => void;
}

const InputNomal: React.FC<InputNomalProps> = ({ addUserMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    //버튼으로 보내기
    const handleSend = () => {
        if (inputValue.trim()) {
            addUserMessage(inputValue);
            setInputValue('');
        }
    };

    //enter키로 보내기
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
            <div className="max-w-[768px] w-full p-4 bg-neutral-white-opacity-80 backdrop-blur-[10px]
                            fixed bottom-0 z-10
                            justify-start items-start inline-flex">
                <input className="grow shrink basis-0 h-14 pl-4 pr-3 py-4 bg-neutral-white 
                                  rounded-tl-2xl rounded-bl-2xl border-l border-t border-b border-neutral-300 
                                  justify-start items-center flex
                                  text-paragraph-l text-neutral-700"
                        placeholder="무엇이든 물어보세요"
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        >
                </input>

                <div className="w-[60px] h-14 pl-4 pr-3 py-4 bg-neutral-white 
                                rounded-tr-2xl rounded-br-2xl border-r border-t border-b border-neutral-300 
                                justify-start items-center flex">
                    <button className="w-8 h-8 blueBtnStyle-s"
                            onClick={handleSend}>
                        <Icon name="sendMessage" 
                                  width={20} 
                                  height={20}/>
                    </button>
                </div>
            </div>
    );
};

export default InputNomal;