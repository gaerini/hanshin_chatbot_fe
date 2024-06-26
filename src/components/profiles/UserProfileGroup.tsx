import React from 'react';
import UserProfile from './UserProfile';

interface UserProfileGroupProps {
    userName: string;
    userLevel: string;
    handleLogout: () => void;
    alignment : 'start' | 'end';
}

const UserProfileGroup: React.FC<UserProfileGroupProps> = ({ userName, userLevel, handleLogout, alignment }) => (
    <div className={`w-full justify-${alignment} items-center gap-4 flex`}>
        <UserProfile userName={userName} userLevel={userLevel}/>
        <div className='items-center gap-1 inline-flex'>
            <p className='text-neutral-400 text-caption'>|</p>
            <button className='text-caption font-medium textBtnStyle whitespace-nowrap' onClick={handleLogout}>
                로그아웃
            </button>
        </div>
    </div>
);

export default UserProfileGroup;