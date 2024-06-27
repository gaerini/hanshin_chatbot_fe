import React from 'react';
import Icon, {IconName} from '../icon/Icon';

interface ProjectListProps {
    projectName : string;
    onProjectSelect: (projectName: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projectName, onProjectSelect }) => {

    return (
        <div className ="w-full p-2.5 bg-neutral-white rounded-[10px] 
                         justify-between items-center inline-flex">
            <div className="justify-start items-center gap-2 inline-flex">
                <div className='w-7 h-7 p-1 bg-neutral-200 fill-neutral-700 rounded-lg'>
                    <Icon name="building" width={20} height={20} />
                </div>
                <p className='text-neutral-700 text-paragraph-m'>{projectName}</p>
            </div>
            <button className='textBtnStyle text-caption'
                    onClick={() => onProjectSelect(projectName)}>
                자세히보기
            </button>
        </div>
    );
}; 

export default ProjectList;
