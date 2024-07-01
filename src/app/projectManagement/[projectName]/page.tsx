'use client';

import React, { useState } from 'react';
import Layout from '../../components/utilityComponents/layouts/Layout';
import ProjectDetail from './ProjectDetail';


const ProjectDetailPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // sideBar toggle
  const handleSideBarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className='w-full h-full justify-center items-center inline-flex'>
        <Layout isSidebarOpen={isSidebarOpen} onToggleSidebar={handleSideBarToggle}>
            <ProjectDetail
              projectName=""
            />
        </Layout>
    </div>
  );

}

export default ProjectDetailPage;