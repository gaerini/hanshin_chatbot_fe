import React from 'react';
import Badge from '@/components/basicComponents/Badge';

interface UserBubbleProps {
    userText: string;
    isLastHuman: boolean;
}

const UserBubble: React.FC<UserBubbleProps> = ({ userText, isLastHuman }) => {
    return (
        <div className="w-full p-4 flex-col justify-end items-end inline-flex">
        <div className="flex justify-start items-start gap-x-2.5">
          {isLastHuman && (
            <Badge
              iconName="pencil"
              badgeLabel="학습 중"
              badgeStyle="blueBadgeStyle"
              showIcon={false}
            />
          )}
          <div
            className={`p-2.5 gap-2.5 rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] justify-center items-center inline-flex shadow-lg text-neutral-white text-paragraph-l font-medium ${
              isLastHuman ? "bg-blue-original" : "bg-neutral-600"
            }`}
          >
            {userText}
          </div>
        </div>
      </div>
    );
};

export default UserBubble;