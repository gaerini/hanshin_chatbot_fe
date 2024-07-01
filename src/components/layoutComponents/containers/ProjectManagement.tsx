'use client'

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LargeHeader from '../../headers/LargeHeader';

import ProjectDetail from './superAdmins/ProjectDetail';
import ProjectListPage from './superAdmins/ProjectListPage';

interface ProjectManagementProps {
    isSidebarOpen: boolean;
    selectedProject: string | null;
    onProjectSelect: (projectName: string | null) => void;
    setActivePage: (page: string) => void;
    searchParams: { [key: string]: string | undefined };
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({isSidebarOpen, selectedProject, onProjectSelect, setActivePage, searchParams}) => {
    const router = useRouter();
    // const searchParams = useSearchParams();

    useEffect(() => {
        const project = searchParams.project;
        const view = searchParams.view;

        if (project && project !== selectedProject) {
            onProjectSelect(project === 'null' ? null : project);
        } else if (!project && view !== 'ProjectListPage') {
            router.push(`/main?page=ProjectManagement&view=ProjectListPage`);
        }
    }, [searchParams, selectedProject, router, onProjectSelect]);

    const handleProjectSelect = (projectName: string | null) => {
        onProjectSelect(projectName);
        if (projectName) {
            router.push(`/main?page=ProjectManagement&project=${projectName}&view=ProjectDetail`);
        } else {
            router.push(`/main?page=ProjectManagement&view=ProjectListPage`);
        }
    };

    const view = searchParams.view;

    return (
        <div className='w-full flex-grow flex-col overflow-y-auto h-full'>
            <div className='w-full flex-grow flex-col overflow-y-auto'>
                <LargeHeader leftIconName="dots" 
                            label="프로젝트 관리" 
                            siteMap={` / ${selectedProject || ""}`}  />
            </div>
            <div>
                {selectedProject ? (
                    <ProjectDetail 
                        projectName={selectedProject} 
                        setActivePage={setActivePage}
                    />
                    ) : (
                    <ProjectListPage 
                        isSidebarOpen={isSidebarOpen} 
                        onProjectSelect={handleProjectSelect}
                        setActivePage={setActivePage}  />
                )}

            </div>
        </div>
    );

}

export default ProjectManagement;