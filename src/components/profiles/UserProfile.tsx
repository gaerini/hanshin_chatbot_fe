import React from 'react';
import Icon from '../icon/Icon';
import Badge from '../Badge';

interface UserProfileProps {
    userName : string;
    userLevel :string
}

const UserProfile: React.FC<UserProfileProps> = ({userName, userLevel}) => {
    let badgeStyle = "neutralBadgeStyle";

    if (userLevel === "관리자") {
        badgeStyle = "neutralBadgeStyle";
    } else if (userLevel === "최고관리자") {
        badgeStyle = "superAdminBadgeStyle";
    }

    return (
        <div className="h-7 justify-start items-center gap-2 inline-flex">
            <div className='justify-start items-center gap-2 inline-flex'>
                <div className="bg-neutral-200 fill-neutral-700 dark:bg-neutral-600 dark:fill-neutral-300
                                p-1 rounded-lg justify-start items-center gap-2.5 flex">
                    <Icon name="user_dark" width={20} height={20} />
                </div>
                <div className="text-neutral-700 dark:text-neutral-300 text-title font-semibold whitespace-nowrap">{userName}</div>
            </div>
            {userLevel !== 'nomal' && (
                <Badge iconName="VIP" badgeLabel={userLevel} badgeStyle={badgeStyle} />
            )}
        </div>
    );
};

export default UserProfile;
