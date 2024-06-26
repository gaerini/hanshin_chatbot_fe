'use client';

import React, { useState, useEffect } from 'react';
import TopNav from '@/components/topNavs/TopNav';
import Container from '@/components/Container';
import SideBar from '@/components/sideBars/SideBar';
import { GetApiProvider } from '@/components/dropDown/GetApiContext';
import { ActiveItemProvider } from '../../components/dropDown/ActiveItemContext';
import { ChooseRecommendContextProvider } from '@/components/loadingPages/recommend/ChooseRecommendContext';


const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userLevel, setUserLevel] = useState('');

  //sideBar toggle
  const handleSideBarToggle = () => {
      setIsSidebarOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
};

  //token 보유 유무 확인 후 리디렉션(차후 개선 필요)
  useEffect(() => {
    // 클라이언트 측에서만 실행되도록 함
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (!token) {
        window.location.href = '/login'; // 토큰이 없으면 로그인 페이지로 리디렉션
        return;
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserName(payload.username);

      // 역할에 따른 사용자 레벨 설정
      switch (payload.role) {
        case 'super_admin':
          setUserLevel('최고관리자');
          break;
        case 'admin':
          setUserLevel('관리자');
          break;
        case 'nomal':
          setUserLevel('일반 사용자');
          break;
        default:
          setUserLevel('알 수 없음');
      }
    }
  }, []);

  return (
    <div className="w-full flex-col items-center justify-center">
      <GetApiProvider>
        <ActiveItemProvider>
          <ChooseRecommendContextProvider>

            <TopNav userLevel={userLevel} userName={userName} onToggleSidebar={handleSideBarToggle}/>

            <div className='flex flex-grow'>
              {isSidebarOpen && <SideBar isSuperAdmin={userLevel === '최고관리자'} 
                                         userName={userName} 
                                         userLevel={userLevel} 
                                         handleLogout={handleLogout}/>}
              <Container isSidebarOpen={isSidebarOpen}/>
            </div> 

          </ChooseRecommendContextProvider>
        </ActiveItemProvider>
      </GetApiProvider>
    </div>
  );

}

export default Home;