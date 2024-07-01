import React from 'react';

interface UserBubbleProps {
    userText: string;
}

const UserBubble: React.FC<UserBubbleProps> = ({ userText }) => {
    return (
        <div className="w-full p-4 flex-col justify-end items-end gap-2.5 inline-flex">
            <div className='p-2.5 gap-2.5 bg-neutral-600 rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px]
                            justify-center items-center inline-flex shadow-lg
                            text-neutral-white text-paragraph-l font-medium'>
                {userText}
            </div>
        </div>
    );
};

export default UserBubble;