import React from 'react';
import ChatBot from './ChatBot';
import ProjectManagement from './ProjectManagement';
import AddPapers from './superAdmins/AddPapers';
import AddProject from './superAdmins/AddProject';

interface ContainerProps {
    isSidebarOpen: boolean;
    activePage: string;
    selectedProject: string | null;
    onProjectSelect: (projectName: string | null) => void;
    setActivePage: (page: string) => void;
    selectedMemoryId: string | null;
}

const Container: React.FC<ContainerProps> = ({
    isSidebarOpen, 
    activePage, 
    selectedProject, 
    onProjectSelect, 
    setActivePage, 
    selectedMemoryId
}) => {
  return (
    <div className={`w-full mt-[83px] h-full items-center 
                        ${isSidebarOpen 
                            ? 'pl-[336px]' 
                            : 'max-w-[768px] mx-auto'}`}>
        {activePage === 'ChatBot' && <ChatBot isSidebarOpen={isSidebarOpen} selectedMemoryId={selectedMemoryId}/>}
        {activePage === 'ProjectManagement' && 
                        <ProjectManagement 
                          setActivePage={setActivePage}
                          isSidebarOpen={isSidebarOpen} 
                          selectedProject={selectedProject} 
                          onProjectSelect={onProjectSelect}/>}
        {activePage === 'AddPapers' && <AddPapers selectedProject=""/>}
        {activePage === 'AddProject' && <AddProject />}
    </div>
  );

}

export default Container;