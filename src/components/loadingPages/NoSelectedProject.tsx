import React from 'react';
import Icon from '../icon/Icon';


const NoSelectedProject: React.FC = () => {
    const paperListLink = "https://immense-taxi-8c1.notion.site/6b41e16de7734650a32c00c0323d889d?pvs=4";
    const openPaeperLiskLink = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.open(paperListLink, "_blank");
      };

    return (
        <div className='w-full h-full p-4 flex-col justify-center items-center gap-4 inline-flex overflow-hidden'>
            <div className='w-full h-full p-8 rounded-2xl flex-col justify-start items-center gap-8 inline-flex'>
                <div className='w-full flex-col justify-start items-center gap-4 inline-flex 
                             text-title-l text-neutral-600 fill-neutral-600 dark:text-neutral-300 dark:fill-neutral-300
                             text-center font-bold'>
                    <Icon name='dotsClick' width={80} height={80} />
                    프로젝트를 선택해 주세요
                </div>   
                <div className='w-full text-center text-neutral-500 fill-neutral-500 dark:text-neutral-400 dark:fill-neutral-400 text-paragraph-l'>
                    <span className="font-bold">빌드챗</span>
                    <span className="font-medium">은 복잡한 공사 계약서 속 내용을<br/>쉽게 찾아볼 수 있는</span>
                    <span className="font-bold"> AI 챗봇</span>
                    <span className="font-medium">입니다.</span>
                </div>
                <button className="text-center text-paragraph-m font-normal underline textBtnStyle"
                        onClick={openPaeperLiskLink}>
                    빌드챗이 학습한 서류의 목록이 궁금하시다면?
                </button>
            </div>
        </div>
    );
};

export default NoSelectedProject;