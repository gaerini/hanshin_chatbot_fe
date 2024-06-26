import React from 'react';
import Icon, {IconName} from '../icon/Icon';

interface LargeHeaderProps {
    leftIconName : IconName;
    siteMap : string;
    label : string;
    style : string | null;
}

const LargeHeader: React.FC<LargeHeaderProps> = ({ leftIconName, label, style, siteMap }) => {

    return (
        <div className={`w-full h-[54px] pl-5 pr-4 justify-between items-center inline-flex 
                         text-neutral-700 fill-neutral-700 dark:text-neutral-300 dark:fill-neutral-300
                        ${style}`}>
            <div className="justify-start items-center gap-1 flex">
                <Icon name= {leftIconName} width={20} height={20} />
                <div className='inline-flex'>
                    <div className="text-title font-semibold">{label}</div>
                    <div className='text-paragraph-l font-normal'>{siteMap}</div>
                </div>
            </div>
        </div>
    );
};

export default LargeHeader;
