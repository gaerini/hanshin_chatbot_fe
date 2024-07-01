'use client'
import React from 'react';
import Icon, {IconName} from '../../../icon/Icon';

interface AdminMenuProps {
    iconName : IconName;
    label : string;
    onClick : () => void;
}

const AdminMenu: React.FC<AdminMenuProps> = ({ iconName, label, onClick }) => {

    return (

        <button className=' w-full gap-2 btnStyle-m text-paragraph-l font-medium
                            neutralBtnStyle-default hover:neutralBtnStyle-hover active:neutralBtnStyle-active'
                onClick={onClick}>
            <Icon name={iconName} width={18} height={18}/>
            {label}
        </button>

    );
};

export default AdminMenu;
