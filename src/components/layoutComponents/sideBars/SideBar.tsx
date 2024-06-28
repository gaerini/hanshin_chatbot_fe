import React from 'react';
import DailyLogSelector from './DailyLogSelectors';
import AdminMenu from './admins/AdminMenu';
import NomalHeader from '../../headers/\bNomalHeader';
import UserProfileGroup from '../../profiles/UserProfileGroup';
import { useActiveItemContext } from '@/components/dropDown/ActiveItemContext';

interface SideBarProps {
    isSuperAdmin : boolean;
    userName: string;
    userLevel: string;
    handleLogout: () => void;
    setActivePage: (page: string) => void;
    memoryIdList: Array<{ memory_id: string, last_chat_time: string, project_name: string }>;
    onSelectMemory: (memoryId: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ 
    isSuperAdmin, 
    userName, 
    userLevel, 
    handleLogout, 
    setActivePage,
    memoryIdList,
    onSelectMemory  
}) => {
    const { selectedProject,setSelectedProject } = useActiveItemContext(); 
    
    const filteredMemoryIdList = selectedProject 
        ? memoryIdList.filter(memory => memory.project_name === selectedProject) 
        : memoryIdList;

    const handleSelectMemory = (memoryId: string, projectName: string) => {
        console.log('SideBar handleSelectMemory', memoryId, projectName);
        onSelectMemory(memoryId);
        setSelectedProject(projectName);
    };

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
                            selectedProject={selectedProject} />
                    <div className='w-full px-4 pt-2.5 pb-4 flex-col justify-start items-start gap-2 inline-flex'>
                        <AdminMenu iconName="dots" 
                                   label="프로젝트 관리" 
                                   onClick={() => setActivePage('ProjectManagement')}/>
                        <AdminMenu iconName="chart_dark" 
                                   label="사용현황 조회" 
                                   onClick={() => setActivePage('')}/>
                    </div>
                </div>
                
            )}
            <div className='flex-col justify-start'>
                <NomalHeader leftIconName = "storage_dark"
                            rightIconName = "plus" 
                            label = "나의 대화내역" 
                            style = "" 
                            rightBtn ={true}
                            selectedProject={selectedProject}/>
                {filteredMemoryIdList.map((memory) => {
                    const date = memory.last_chat_time.split('T')[0];
                    return (
                        <DailyLogSelector 
                            key={memory.memory_id}
                            memoryId={memory.memory_id}
                            date={date}
                            firstQueries={memory.project_name}
                            projectName={memory.project_name}
                            onSelectMemory={handleSelectMemory}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SideBar;
