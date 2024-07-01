import React from 'react';
import DailyLogSelector from '../sideBars/DailyLogSelectors';
import AdminMenu from '../sideBars/AdminMenu';
import NomalHeader from '../../basicComponents/headers/NomalHeader';
import UserProfileGroup from '../../basicComponents/profiles/UserProfileGroup';
import { useActiveItemContext } from '@/components/utilityComponents/dropDown/ActiveItemContext';

interface SideBarProps {
    isSuperAdmin : boolean;
    userName: string;
    userLevel: string;
    handleLogout: () => void;
    memoryIdList: Array<{ memory_id: string, last_chat_time: string, project_name: string }>;
    onSelectMemory: (memoryId: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ 
    isSuperAdmin, 
    userName, 
    userLevel, 
    handleLogout, 
    memoryIdList,
    onSelectMemory  
}) => {
    const { selectedProjectForChat , setSelectedProjectForChat } = useActiveItemContext(); 
    
    //드롭다운에서 프로젝트 선택시 해당 프로젝트값을 가진 MemoryId만 보이게
    const filteredMemoryIdList = selectedProjectForChat 
        ? memoryIdList.filter(memory => memory.project_name === selectedProjectForChat) 
        : memoryIdList;

    //memoryId 선택 시 chatBot 컴포넌트에 대화 내용 렌더링 되도록, props 값 전달
    const handleSelectMemory = (memoryId: string, projectName: string) => {
        //console.log('SideBar handleSelectMemory', memoryId, projectName);
        onSelectMemory(memoryId);
        setSelectedProjectForChat(projectName);
    };

    // 날짜별로 memoryIdList 그룹화
    const groupedMemoryIdList = filteredMemoryIdList.reduce((groups, memory) => {
        const date = memory.last_chat_time.split('T')[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(memory);
        return groups;
    }, {} as { [date: string]: Array<{ memory_id: string, last_chat_time: string, project_name: string }> });

    return (
        <div className='w-[336px] h-screen mt-[83px] flex flex-col gap-2 
                        fixed left-0 top-0 bottom-0 z-10 overflow-y-auto'>
            <div className='block md:hidden w-full p-4 justify-start'>
                <div className=''>
                    <UserProfileGroup userName={userName} userLevel={userLevel} handleLogout={handleLogout} alignment='start' />
                </div>
            </div>
            {isSuperAdmin && (
                <div className='w-full flex-col justify-start'> 
                    <NomalHeader leftIconName = "setting_dark"
                            rightIconName = "plus" 
                            label = "챗봇 관리하기" 
                            style = "" 
                            rightBtn ={false}
                            selectedProject={selectedProjectForChat} />
                    <div className='w-full px-4 pt-2.5 pb-4 flex-col justify-start items-start gap-2 inline-flex'>
                        <AdminMenu iconName="dots" 
                                   label="프로젝트 관리" 
                                   onClick={() => window.location.href = '/projectManagement'}/>
                        <AdminMenu iconName="chart_dark" 
                                   label="사용현황 조회" 
                                   onClick={() => window.location.href = ''}/>
                    </div>
                </div>
                
            )}
            <div className='flex-col justify-start'>
                <NomalHeader leftIconName = "storage_dark"
                            rightIconName = "plus" 
                            label = "나의 대화내역" 
                            style = "" 
                            rightBtn ={true}
                            selectedProject={selectedProjectForChat}/>
                 {Object.keys(groupedMemoryIdList).map((date) => (
                    <DailyLogSelector 
                        key={date}
                        date={date}
                        memoryIds={groupedMemoryIdList[date]}
                        onSelectMemory={handleSelectMemory}
                    />
                ))}
            </div>
        </div>
    );
};

export default SideBar;
