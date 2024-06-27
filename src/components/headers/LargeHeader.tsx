import React from 'react';
import Icon, {IconName} from '../icon/Icon';

interface LargeHeaderProps {
    leftIconName : IconName;
    siteMap : string;
    label : string;
}

const LargeHeader: React.FC<LargeHeaderProps> = ({ leftIconName, label, siteMap }) => {

    return (
        <div className={`w-full h-[54px] px-4 py-4 justify-between items-center inline-flex 
                         text-neutral-700 fill-neutral-700 dark:text-neutral-300 dark:fill-neutral-300
                        `}>
            <div className="justify-start items-center gap-1 flex">
                <Icon name= {leftIconName} width={20} height={20} />
                <div className='inline-flex items-center gap-4'>
                    <div className="text-title font-semibold">{label}</div>
                    <div className='text-paragraph-l font-light'>{siteMap}</div>
                </div>
            </div>
        </div>
    );
};

export default LargeHeader;
