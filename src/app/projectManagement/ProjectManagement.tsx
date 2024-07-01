'use client'

import React from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
import LargeHeader from '@/components/basicComponents/headers/LargeHeader';
import ProjectList from '@/components/basicComponents/lists/ProjectList';
import Icon from '@/components/basicComponents/icon/Icon';

interface ProjectManagementProps {
    isSidebarOpen: boolean;
    onProjectSelect: (projectName: string) => void;
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({ isSidebarOpen, onProjectSelect }) => {
    return (
        <div className='w-full flex-grow flex-col overflow-y-auto h-full'>
            <div className='w-full flex-grow flex-col overflow-y-auto'>
                <LargeHeader leftIconName="dots" 
                            label="프로젝트 관리" 
                            siteMap={` / d`}  />
            </div>
            <div>
                <div className='w-full p-4 bg-white flex-col justify-start items-start gap-2.5 inline-flex'>
                    <ProjectList projectName='용산 어쩌고' onProjectSelect={onProjectSelect} />
                    <ProjectList projectName='판교 어쩌고' onProjectSelect={onProjectSelect} />
                </div>
                <div className={`fixed bottom-0 px-5 py-4
                    ${isSidebarOpen 
                    ? 'pl-[336px] w-full right-0' 
                    : 'max-w-[768px] w-full'}`}>
                    <button className='w-full btnStyle-l justify-center items-center gap-2 flex
                                    border border-neutral-200 neutralBtnStyle-default hover:neutralBtnStyle-hover active:neutralBtnStyle-active'
                            onClick={() => window.location.href = '/addProject'}>
                        <Icon name='dotsPlus' width={24} height={24} />
                        새 프로젝트 생성하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProjectManagement;