import React from 'react';
import Icon from '../icon/icon';

const InputLarge: React.FC = () => {
    return (
            <div className="max-w-[768px] w-full p-4 bg-neutral-white-opacity-80 backdrop-blur-[10px]
                            fixed bottom-0 z-10
                            justify-start items-start inline-flex">
                <input className="grow shrink basis-0 h-14 pl-4 pr-3 py-4 bg-neutral-white 
                                  rounded-tl-2xl rounded-bl-2xl border-l border-t border-b border-neutral-300 
                                  justify-start items-center flex
                                  text-paragraph-l text-neutral-700"
                        placeholder="무엇이든 물어보세요">
                </input>

                <div className="w-[60px] h-14 pl-4 pr-3 py-4 bg-neutral-white 
                                rounded-tr-2xl rounded-br-2xl border-r border-t border-b border-neutral-300 
                                justify-start items-center flex">
                    <button className="w-8 h-8 blueBtnStyle-s">
                        <Icon name="sendMessage" 
                                  width={20} 
                                  height={20}/>
                    </button>
                </div>
            </div>
    );
};

export default InputLarge;