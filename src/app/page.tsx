'use client'

import React, { useState } from 'react';
import TopNav from '@/components/TopNav';
import Container from '@/components/Container';
import SideBar from '@/components/sideBar/SideBar';
import { GetApiProvider } from '@/components/dropDown/GetApiContext';
import { ActiveItemProvider } from '../components/dropDown/ActiveItemContext';
import { ChooseRecommendContextProvider } from '@/components/loadingPages/recommend/ChooseRecommendContext';


const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSideBarToggle = () => {
        setIsSidebarOpen(prevState => !prevState);
        console.log('SideBarToggle state:', !isSidebarOpen);
    };


  return (
    <div className="w-full flex-col items-center justify-center">
      <GetApiProvider>
        <ActiveItemProvider>
          <ChooseRecommendContextProvider>

            <TopNav userLevel='nomal' onToggleSidebar={handleSideBarToggle}/>

            <div className='flex flex-grow'>
              {isSidebarOpen && <SideBar isSuperAdmin={true} />}
              <Container isSidebarOpen={isSidebarOpen}/>
            </div> 

          </ChooseRecommendContextProvider>
        </ActiveItemProvider>
      </GetApiProvider>
    </div>
  );

}

export default Home;