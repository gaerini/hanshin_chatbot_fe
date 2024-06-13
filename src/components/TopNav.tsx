
'use client'
import React , { useState, useEffect } from 'react';
import DropDownController from './dropDown/DropDownController';
import Icon from './icon/Icon';


const TopNav: React.FC = () => {
  const paperListLink =
    "https://immense-taxi-8c1.notion.site/6b41e16de7734650a32c00c0323d889d?pvs=4";
  const openPaeperLiskLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open(paperListLink, "_blank");
  };


    const [buttonText, setButtonText] = useState('빌드챗이 학습한 서류의 목록이 궁금하시다면?');
    
    const handleResize = () => {
        if (window.innerWidth <= 500) {
            setButtonText('서류 목록 확인');
        } else {
            setButtonText('빌드챗이 학습한 서류의 목록이 궁금하시다면?');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // 컴포넌트가 마운트될 때 초기 크기 설정

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="w-full h-[83px] fixed top-0 left-0 z-10
                        p-4 bg-neutral-white-opacity-80 backdrop-blur-[10px] justify-between items-center inline-flex">
            <div>
                <DropDownController projectName=""/>
            </div>
            <button className="justify-start items-center gap-1 inline-flex text-paragraph-m
                               textBtnStyle"
                    onClick={openPaeperLiskLink}>
                <Icon name="infomation"
                      width={18}
                      height={18} />
                {buttonText}
            </button>
        </div>
    );
};

export default TopNav;
