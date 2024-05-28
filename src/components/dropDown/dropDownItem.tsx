import React from 'react';

interface DropDownItemProps {
    isActive: boolean;
    projecName: string;
    onClick: () => void;
}

const DropDownItem: React.FC<DropDownItemProps> = ({ projecName, onClick, isActive }) => {
    return (
        <button className={`w-[200px] neutralBtnStyle-m 
                            ${isActive ? 'bg-neutral-200 font-bold duration-500' 
                                       : 'bg-neutral-white font-normal hover:bg-neutral-100 hover:font-bold'}`}
                            
                onClick = {onClick} >
            {projecName}
        </button>
    );
};

export default DropDownItem;