
import React from 'react';
import DropDownController from './dropDown/dropDownController';
// import TypingIndicator from './bubble/typingIndicator';

const TopNav: React.FC = () => {

    return (
        <div className="w-full h-[83px] fixed top-0 left-0 z-10
                        p-4 bg-neutral-white-opacity-80 backdrop-blur-[10px] justify-between items-center inline-flex">
            <div>
                <DropDownController projectName=""/>
            </div>
            {/* <button className="justify-start items-center gap-1 inline-flex text-paragraph-m
                               text-neutral-500 fill-neutral-500
                               hover:text-neutral-700 hover:fill-neutral-700">
                <Icon name="infomation"
                      width={18}
                      height={18} />
                도움이 필요하세요?
            </button> */}
        </div>
    );
};

export default TopNav;