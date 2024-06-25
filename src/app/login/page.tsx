import React from 'react';
import Icon from '@/components/icon/Icon';
import InputIcon from '@/components/inputs/InputIcon';

const LoginPage: React.FC = () => {

  return (
    <div className='w-full h-full justify-center items-center inline-flex'>
        <div className="w-[375px] h-screen px-4 flex-col justify-center items-center gap-8 inline-flex shrink">
            <Icon name="logo_kor_vert" width={200} height={146.70} />
            <div className='w-full flex-col justify-center items-start gap-1 inline-flex'>
                <InputIcon iconName='user_dark' placeholder='아이디를 입력해 주세요'/>
                <InputIcon iconName='lock_dark' placeholder='비밀번호를 입력해 주세요'/>
            </div>
            <button className='w-full btnStyle-l blueBtnStyle-default hover:blueBtnStyle-hover active:blueBtnStyle-active
                               justify-center items-center'>
                로그인
            </button>
        </div>
    </div>
  );

}

export default LoginPage;