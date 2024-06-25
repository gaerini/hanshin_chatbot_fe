'use client'
import React from 'react';
import DropDownController from './dropDown/DropDownController';
import Icon from './icon/Icon';

import UserProfile from './profiles/UserProfile';
import Toggler from './Toggler';

interface TopNavProps {
    userLevel : string;
}

const TopNav: React.FC<TopNavProps> = ({userLevel}) => {
        //서류 목록 사이드바로 뺄 때 이 코드 가져가기
    // const paperListLink = "https://immense-taxi-8c1.notion.site/6b41e16de7734650a32c00c0323d889d?pvs=4";
    // const openPaeperLiskLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     window.open(paperListLink, "_blank");
    //   };

      // 나중에 반응형 할때 참고!
    // const [buttonText, setButtonText] = useState('빌드챗이 학습한 서류의 목록이 궁금하시다면?');
    
    // const handleResize = () => {
    //     if (window.innerWidth <= 640) {
    //         setButtonText('서류 목록 확인');
    //     } else {
    //         setButtonText('빌드챗이 학습한 서류의 목록이 궁금하시다면?');
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener('resize', handleResize);
    //     handleResize(); // 컴포넌트가 마운트될 때 초기 크기 설정

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    const handleToggle = (state: boolean) => {
        console.log('Toggle state:', state);
      };

      
    return (
        <div className="w-full h-[83px] fixed top-0 left-0 z-10
                        bg-neutral-white dark:bg-neutral-black justify-start items-center inline-flex">
            <div className='w-[336px] p-4 justify-start items-center gap-2.5 inline-flex'>
                <button className="w-11 h-11 btnStyle-m justify-start items-center inline-flex
                                   neutralBtnStyle-default hover:neutralBtnStyle-hover active:neutralBtnStyle-active">
                    <Icon name="list" width={24} height={24} />
                </button>
                <DropDownController projectName=""/>
            </div>

            <div className="w-full p-4 justify-between items-center gap-4 inline-flex">
                {userLevel !== 'nomal' && ( // 조건부 렌더링
                    <Toggler iconNameOn="pencil"
                            iconNameOff="dots_horiz"
                            labelOn="학습 중 ..."
                            labelOff="학습시키기"
                            initialState={false}
                            onToggle={handleToggle} />
                )}
                <div className='w-full justify-end items-center gap-4 flex'>
                    <UserProfile userName='김사원' userLevel={userLevel}/>
                    <div className='justify-end items-center gap-1 inline-flex'>
                        <p className='text-neutral-400 text-caption'>|</p>
                        <button className='text-caption font-medium textBtnStyle whitespace-nowrap'>로그아웃</button>
                    </div>
                </div>
                </div>
        </div>
    );
};

export default TopNav;
