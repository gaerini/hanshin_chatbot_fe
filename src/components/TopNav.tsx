'use client'
import React from 'react';
import DropDownController from './dropDown/DropDownController';
import Icon from './icon/Icon';
// import TypingIndicator from './bubble/typingIndicator';

const TopNav: React.FC = () => {
    const paperListLink = "https://immense-taxi-8c1.notion.site/6b41e16de7734650a32c00c0323d889d?pvs=4";
    const openPaeperLiskLink = (e) => {
        e.preventDefault();
        window.open(paperListLink, "_blank");
      };

    return (
        <div className="w-full h-[83px] fixed top-0 left-0 z-10
                        p-4 bg-neutral-white-opacity-80 backdrop-blur-[10px] justify-between items-center inline-flex">
            <div>
                <DropDownController projectName=""/>
            </div>
            <button className="justify-start items-center gap-1 inline-flex text-paragraph-m
                               text-neutral-400 fill-neutral-400
                               hover:text-blue-original hover:fill-blue-original"
                    onClick={openPaeperLiskLink}>
                <Icon name="infomation"
                      width={18}
                      height={18} />
                빌드챗이 학습한 서류의 목록이 궁금하시다면?
            </button>
        </div>
    );
};

export default TopNav;