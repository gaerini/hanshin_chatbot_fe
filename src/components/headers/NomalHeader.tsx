import React from 'react';
import Icon, {IconName} from '../icon/Icon';

interface NomalHeaderProps {
    leftIconName : IconName;
    rightIconName : IconName;
    label : string;
    style : string | null;
    rightBtn : boolean;
}

const NomalHeader: React.FC<NomalHeaderProps> = ({ leftIconName, rightIconName, label, style, rightBtn }) => {

    return (
        <div className={`w-full h-[51px] pl-5 pr-4 justify-between items-center inline-flex 
                         text-neutral-700 fill-neutral-700 dark:text-neutral-300 dark:fill-neutral-300
                        ${style}`}>
            <div className="justify-start items-center gap-1 flex">
                <Icon name= {leftIconName} width={18} height={18} />
                <div className="text-paragraph-l font-semibold">{label}</div>
            </div>
            
            {rightBtn && (
                <button className="btnStyle-m justify-center items-center gap-2 inline-flex
                                   neutralBtnStyle-default hover:neutralBtnStyle-hover active:neutralBtnStyle-active">
                    <Icon name ={rightIconName} width={18} height={18} />
                </button>
            )}
        </div>
    );
};

export default NomalHeader;
