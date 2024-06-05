import React from 'react';

interface DropDownItemProps {
    isActive: boolean;
    projectName: string;
    onClick: () => void;
}

const DropDownItem: React.FC<DropDownItemProps> = ({ projectName, onClick, isActive }) => {
    return (
        <button className={`w-[200px] neutralBtnStyle-m dark:neutralBtnStyle-m-dark
                            ${isActive ? 'bg-neutral-200 font-bold duration-500 dark:bg-neutral-600 dark:font-bold dark:duration-500' 
                                       : 'bg-neutral-white font-normal hover:bg-neutral-100 hover:font-bold dark:bg-neutral-800 dark:font-normal dark:hover:bg-neutral-700 dark:hover:font-bold'}`}
                            
                onClick = {onClick} >
            {projectName}
        </button>
    );
};

export default DropDownItem;