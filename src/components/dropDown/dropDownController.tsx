"use client"

import React, { useState } from 'react';
import Icon from '../icon/icon';
import DropDown from './dropDown';

interface DropDownControllerProps {
    projectName: string;
}

const DropDownController: React.FC<DropDownControllerProps> = ({ projectName }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const handleToggleDropDown = () => {
        setIsOpened(!isOpened); // 클릭 시 isActive를 true로 설정
    }

    const handleSelectProject = (projectName: string) => {
        setSelectedProject(projectName);
        setActiveItem(projectName);
    }
    


    return(
        <div className="relative flex-col justify-start items-start gap-2 inline-flex">
            <button className={`w-[216px] neutralBtnStyle-l justify-between
                                ${isOpened ? 'bg-neutral-200 hover:bg-neutral-100' 
                                           : 'bg-neutral-white hover:bg-neutral-100'}`}
                    
                    onClick = {handleToggleDropDown}>
                        <div className="gap-2 justify-start items-center inline-flex">
                            <Icon name="building" width={20} height={20}
                                  className='fill-neutral-400' />
                            {selectedProject || projectName || <p className={`font-midium ${isOpened ? 'text-neutral-700' : 'text-neutral-400' }`}>프로젝트 선택</p>}
                        </div>
                        <Icon name="arrowUp" width={20} height={20}
                              className={`fill-neutral-400 
                                          ${isOpened ? '' 
                                                     : '-rotate-180'}`} />        
            </button>
            {isOpened && <DropDown
                                   activeItem={activeItem} 
                                   setActiveItem={setActiveItem}
                                   onSelect={handleSelectProject}/>}
        </div>
    );
}

export default DropDownController;