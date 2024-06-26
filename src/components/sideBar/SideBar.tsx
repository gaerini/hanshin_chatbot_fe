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
            {isSuperAdmin && (
                <div className='w-full flex-col justify-start bg-neutral-100'> 
                {/* rounded-tr-2xl rounded-br-2xl'> */}
                    <NomalHeader leftIconName = "setting_dark"
                            rightIconName = "plus" 
                            label = "챗봇 관리하기" 
                            style = "" 
                            rightBtn ={false} />
                    <div className='w-full px-4 pt-2.5 pb-4 flex-col justify-start items-start gap-2 inline-flex'>
                        <AdminMenu iconName="dots" 
                                   label="프로젝트 관리" 
                                   link=""/>
                        <AdminMenu iconName="chart_dark" 
                                   label="사용현황 조회" 
                                   link=""/>
                    </div>
                </div>
                
            )}
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
