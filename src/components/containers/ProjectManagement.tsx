import React from 'react';
import LargeHeader from '../headers/LargeHeader';
import ProjectList from '../lists/ProjectList';

interface ProjectManagementProps {
    isSidebarOpen: boolean;
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({isSidebarOpen}) => {
  return (
    <div className='w-full flex-grow flex-col overflow-y-auto h-full'>
            <LargeHeader leftIconName="dots" 
                        label="프로젝트 관리" 
                        style="" 
                        siteMap="" />
            <div className='w-full p-4 bg-white flex-col justify-start items-start gap-2.5 inline-flex'>
                <ProjectList projectName='용산 어쩌고' />
            </div>
    </div>
  );

}

export default ProjectManagement;