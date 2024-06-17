//

//import './globals.css';
import React from 'react';
import TopNav from '@/components/TopNav';
import Container from '@/components/Container';
import { GetApiProvider } from '@/components/dropDown/GetApiContext';
import { ActiveItemProvider } from '../components/dropDown/ActiveItemContext';


const Home: React.FC = () => {

  return (
    <div className="w-full flex-col justify-start items-center">
      <GetApiProvider>
        <ActiveItemProvider>
          <TopNav />
          <Container />
        </ActiveItemProvider>
      </GetApiProvider>
    </div>
  );

}

export default Home;