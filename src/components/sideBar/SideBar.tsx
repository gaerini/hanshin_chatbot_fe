import React from 'react';
import DailyLogSelector from './logs/DailyLogSelectors';
import AdminMenu from './AdminMenu';
import NomalHeader from '../headers/\bNomalHeader';

interface SideBarProps {
    isSuperAdmin : boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isSuperAdmin }) => {

    return (
        <div className='w-[336px] h-screen mt-[83px] flex flex-col gap-2
                        fixed left-0 top-0 bottom-0 z-10 overflow-y-auto'>
            <div className='flex-col justify-start'>
                <NomalHeader leftIconName = "storage_dark"
                            rightIconName = "plus" 
                            label = "나의 대화내역" 
                            style = "" 
                            rightBtn ={true} />
                <DailyLogSelector date="6월 32일 (일)" firstQueries="아무거나 일단 틀어 아무거나 신나는 걸로 고양이는 야옹 울어"/>
            </div>
        </div>
    );
};

export default SideBar;
