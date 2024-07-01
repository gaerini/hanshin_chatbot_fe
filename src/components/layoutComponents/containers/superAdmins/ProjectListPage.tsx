"use client";

import React from "react";
import ProjectList from "../../../lists/ProjectList";
import Icon from "../../../icon/Icon";

interface ProjectListPageProps {
  isSidebarOpen: boolean;
  projects: string[];
  onProjectSelect: (projectName: string) => void;
  setActivePage: (page: string) => void;
}

const ProjectListPage: React.FC<ProjectListPageProps> = ({
  isSidebarOpen,
  projects,
  onProjectSelect,
  setActivePage,
}) => {
  return (
    <div>
      <div className="w-full p-4 bg-white flex-col justify-start items-start gap-2.5 inline-flex">
        {/* dw 0701 : 프로젝트 이름 prop 넘겨주기 위해 추가 */}
        {projects.map((projectName) => (
          <ProjectList
            key={projectName}
            projectName={projectName}
            onProjectSelect={onProjectSelect}
          />
        ))}
      </div>
      <div
        className={`fixed bottom-0 px-5 py-4
                ${
                  isSidebarOpen
                    ? "pl-[336px] w-full right-0"
                    : "max-w-[768px] w-full"
                }`}
      >
        <button
          className="w-full btnStyle-l justify-center items-center gap-2 flex
                                border border-neutral-200 neutralBtnStyle-default hover:neutralBtnStyle-hover active:neutralBtnStyle-active"
          onClick={() => setActivePage("AddProject")}
        >
          <Icon name="dotsPlus" width={24} height={24} />새 프로젝트 생성하기
        </button>
      </div>
    </div>
  );
};

export default ProjectListPage;
