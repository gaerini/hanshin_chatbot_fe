//

//import './globals.css';
import React from 'react';
import TopNav from '@/components/TopNav';
import Container from '@/components/Container';
import { ActiveItemProvider } from '../components/dropDown/ActiveItemContext';


const Home: React.FC = () => {

  return (
    <div className="w-full flex-col justify-start items-center">
      <ActiveItemProvider>
        <TopNav />
        <Container />
      </ActiveItemProvider>
    </div>
  );

}

export default Home;