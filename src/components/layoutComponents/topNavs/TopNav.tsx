import React from 'react';
import DropDownController from '../../dropDown/DropDownController';
import Icon from '../../icon/Icon';

import UserProfileGroup from '../../profiles/UserProfileGroup';
import Toggler from '../../Toggler';
import { useActiveItemContext } from '@/components/dropDown/ActiveItemContext';

interface TopNavProps {
    userLevel : string;
    userName : string;
    onToggleSidebar: () => void;
}

const TopNav: React.FC<TopNavProps> = ({userLevel, userName, onToggleSidebar}) => {
    const { setSelectedProjectForChat } = useActiveItemContext();

    const handleAdminToggle = (state: boolean) => {
        console.log('AdminToggle state:', state);
    };

    const handleLogout = () => {
        // 토큰을 로컬 스토리지에서 제거
        localStorage.removeItem('access_token');
        console.log('로그아웃: 토큰 제거됨');
        // 로그인 페이지로 리디렉션
        window.location.href = '/login';
    };

      
    return (
        <div className="w-full h-[83px] fixed top-0 left-0 right-0 z-20
                        bg-neutral-white dark:bg-neutral-black justify-start items-center inline-flex">
            <div className='w-[336px] p-4 justify-start items-center gap-2.5 inline-flex'>
                <button className="w-11 h-11 btnStyle-m justify-start items-center inline-flex
                                   neutralBtnStyle-default hover:neutralBtnStyle-hover active:neutralBtnStyle-active"
                        onClick={onToggleSidebar} >
                    <Icon name="list" width={24} height={24} />
                </button>
                <DropDownController projectName=""/>
            </div>

            <div className="w-full h-[51px] p-4 justify-between items-center gap-4 inline-flex">
                {userLevel !== '일반 사용자' && (
                    <Toggler iconNameOn="pencil"
                            iconNameOff="dots_horiz"
                            labelOn="학습 중 ..."
                            labelOff="학습시키기"
                            initialState={false}
                            onToggle={handleAdminToggle} />
                )}
                <div className="hidden md:flex flex-1 items-center gap-4">
                    <UserProfileGroup userName={userName} userLevel={userLevel} handleLogout={handleLogout} alignment='end' />
                </div>
            </div>
        </div>
    );
};

export default TopNav;
