'use client';

import React, { useState } from 'react';
import Container from './Container';
import ProjectManagement from './ProjectManagement';
import AddPapers from './superAdmins/AddPapers';
import AddProject from './superAdmins/AddProject';

interface ContentsProps {
    isSidebarOpen: boolean;
    activePage: string;
    selectedProject: string | null;
    onProjectSelect: (projectName: string | null) => void;
    setActivePage: (page: string) => void;
}

const Contents: React.FC<ContentsProps> = ({isSidebarOpen, activePage, selectedProject, onProjectSelect, setActivePage}) => {
  return (
    <div className={`flex-grow flex flex-col mt-[83px] h-full items-center
                        ${isSidebarOpen 
                            ? 'pl-[336px] w-full' 
                            : 'max-w-[768px] w-full mx-auto'}`}>
        {activePage === 'Container' && <Container isSidebarOpen={isSidebarOpen}/>}
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

export default Contents;