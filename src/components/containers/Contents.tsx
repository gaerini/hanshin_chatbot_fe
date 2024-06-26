'use client';

import React, { useState } from 'react';
import Container from './Container';
import ProjectManagement from './ProjectManagement';

interface ContentsProps {
    isSidebarOpen: boolean;
}

const Contents: React.FC<ContentsProps> = ({isSidebarOpen}) => {
  return (
    <div className={`flex-grow flex flex-col mt-[83px] h-full items-center
                        ${isSidebarOpen 
                            ? 'pl-[336px] w-full' 
                            : 'max-w-[768px] w-full mx-auto'}`}>
        {/* <Container isSidebarOpen={isSidebarOpen}/> */}
        <ProjectManagement isSidebarOpen={isSidebarOpen} />
    </div>
  );

}

export default Contents;