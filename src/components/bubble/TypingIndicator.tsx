import React from 'react';
import Icon from '../icon/Icon';


const TypingIndicator: React.FC = () => {
    return (
        <div className='w-full p-4 flex-col justify-start items-start gap-2 inline-flex'>
            <div className='justify-start items-center gap-2 inline-flex'>
                <div className="w-[32px] h-[32px] rounded-full shadow-md border border-neutral-300 items-center justify-center inline-flex bg-neutral-white">
                    <Icon name="hanshin"
                        width={24}
                        height={24}/>
                </div>
                <div className="text-neutral-400 text-paragraph-l font-bold">한신공영 AI 챗봇</div>
            </div>

            <div className="w-full pl-10 pr-2.5 py-2.5 bg-white flex-col justify-start items-start gap-4 inline-flex">
                <div className="justify-center items-center inline-flex gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-300 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-neutral-300"></span>
                    </span>
                    <p className="text-paragraph-m text-neutral-400 font-medium animate-pulse">서류들을 살펴보고 있어요 ...</p>
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;