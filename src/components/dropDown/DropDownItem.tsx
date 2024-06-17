import React from 'react';

interface DropDownItemProps {
    isActive: boolean;
    projectName: string;
    onClick: () => void;
}

const DropDownItem: React.FC<DropDownItemProps> = ({ projectName, onClick, isActive }) => {
    return (
        <button className={`w-[234px] btnStyle-m
                            ${isActive ? 'neutralBtnStyle-active hover:neutralBtnStyle-hover' 
                                       : 'neutralBtnStyle-default hover:neutralBtnStyle-hover'}`}
                            
                onClick = {onClick} >
            {projectName}
        </button>
    );
};

export default DropDownItem;