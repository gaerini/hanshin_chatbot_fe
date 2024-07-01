'use client';

import React, { useState } from 'react';
import Layout from '@/components/utilityComponents/layouts/Layout';
import ProjectManagement from './ProjectManagement';


const ProjectManagementPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // sideBar toggle
  const handleSideBarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className='w-full h-full justify-center items-center inline-flex'>
        <Layout isSidebarOpen={isSidebarOpen} onToggleSidebar={handleSideBarToggle}>
            <ProjectManagement 
              isSidebarOpen={isSidebarOpen}
              onProjectSelect={() => window.location.href = '/projectManagement/[projectName]'}
            />
        </Layout>
    </div>
  );

}

export default ProjectManagementPage;