'use client';

import React, { useState } from 'react';
import Icon from '@/components/icon/Icon';
import InputIcon from '@/components/inputs/InputIcon';
import Alert from '@/components/Alert';
import './styles.css';

const LoginPage: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  //log in API fetch
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('https://port-0-hanshin-chatbot-be-1272llwsz1ihz.sel5.cloudtype.app/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('로그인 성공:', data);
        // 예시로 로컬 스토리지에 토큰을 저장합니다.
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('memory_id_list', JSON.stringify(data.memory_id_list));
        window.location.href = '/main?page=ChatBot';
      } else {
        console.error('로그인 실패');
        setError('아이디 혹은 비밀번호가 정확하지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 중 에러 발생:', error);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false); // API 호출 완료 후 로딩 상태 해제
    }
  };

  return (
    <div className='w-full h-full justify-center items-center inline-flex'>
      {loading && (
        <div className="progress-bar-container">
          <div className="progress-bar loading"></div>
        </div>
      )}
        <div className="w-[375px] h-screen px-4 flex-col justify-center items-center gap-8 inline-flex shrink">
            <div className='fill-neutral-black dark:fill-neutral-white'>
              <Icon name="logo_kor_vert" width={200} height={146.70}/>
            </div>
            
            <div className='w-full flex-col justify-center items-start gap-1 inline-flex'>

            {error && <Alert iconName="warning"
                             iconSize={16}
                             alertLabel={error} 
                             alertStyle="alert-s bg-red-100 fill-red-original text-red-original" />}

                <InputIcon iconName='user_dark' placeholder='아이디를 입력해 주세요'
                           type='id' 
                           value={id}
                           onChange={(e) => setId(e.target.value)}/>
                <InputIcon iconName='lock_dark' 
                           placeholder='비밀번호를 입력해 주세요'
                           type='password'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className='w-full btnStyle-l blueBtnStyle-default hover:blueBtnStyle-hover active:blueBtnStyle-active
                               justify-center items-center'
                    onClick={handleLogin}
                    disabled={loading}>
                로그인
            </button>
        </div>
    </div>
  );

}

export default LoginPage;