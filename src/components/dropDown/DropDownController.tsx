"use client";

import React, { useState, useEffect } from "react";
import Icon from "../icon/Icon";
import DropDown from "./DropDown";
import { useActiveItemContext } from "./ActiveItemContext";
import { useGetApiContext } from "./GetApiContext";

interface DropDownControllerProps {
  projectName: string;
}

const DropDownController: React.FC<DropDownControllerProps> = ({
  projectName,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const { getApi, setGetApi } = useGetApiContext();
  const { selectedProjectForChat, setSelectedProjectForChat } =
    useActiveItemContext();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [projects, setProjects] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://port-0-hanshin-chatbot-be-1272llwsz1ihz.sel5.cloudtype.app/projects" // projects 로 수정
        );
        const data = await response.json();
        const projectNames = data.res.map(
          (project: any) => project.project_name
        );
        setProjects(projectNames);
      } catch (error) {
        setGetApi(false);
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [setGetApi]);

  const handleToggleDropDown = () => {
    if (getApi) {
      setIsOpened(!isOpened); // 클릭 시 isActive를 true로 설정
    }
  };

  const handleSelectProject = (projectName: string) => {
    if (projectName === "") {
      setSelectedProjectForChat(null); // 프로젝트 선택 해제 시 null로 설정
    } else {
      setSelectedProjectForChat(projectName);
    }
    setActiveItem(projectName);
  };

  // useEffect(() => {
  //   console.log('DropdownController selectedProject:', selectedProject);
  // }, [selectedProject]);

  return (
    <div className="relative flex-col justify-start items-start gap-2 inline-flex">
      <button
        className={`w-[250px] btnStyle-l justify-between border border-neutral-200 dark:border-neutral-800
                    ${
                      getApi
                        ? isOpened
                          ? "neutralBtnStyle-active hover:neutralBtnStyle-hover"
                          : "neutralBtnStyle-default hover:neutralBtnStyle-hover"
                        : "neutralBtnStyle-disabled"
                    }`}
        onClick={handleToggleDropDown}
        disabled={!getApi}
      >
        <div className="gap-2 justify-start items-center inline-flex">
          <Icon
            name="building"
            width={20}
            height={20}
            className={` 
                        ${
                          getApi
                            ? "fill-neutral-400"
                            : "fill-neutral-300 dark:fill-neutral-500"
                        }`}
          />
          {selectedProjectForChat || projectName || (
            <p
              className={`font-midium 
                        ${
                          getApi
                            ? isOpened
                              ? "text-neutral-700 dark:text-neutral-300"
                              : "text-neutral-400 dark:text-neutral-400"
                            : " text-neutral-300 dark:text-neutral-500"
                        }
                        
                        }`}
            >
              프로젝트 선택
            </p>
          )}
        </div>
        <Icon
          name="arrowUp"
          width={20}
          height={20}
          className={`
                      ${
                        getApi
                          ? isOpened
                            ? "fill-neutral-400 "
                            : "fill-neutral-400 -rotate-180"
                          : "fill-neutral-300 dark:fill-neutral-500 -rotate-180"
                      }`}
        />
      </button>
      {isOpened && (
        <DropDown
          projects={projects}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          onSelect={handleSelectProject}
          setIsOpened={setIsOpened}
        />
      )}
    </div>
  );
};

export default DropDownController;
