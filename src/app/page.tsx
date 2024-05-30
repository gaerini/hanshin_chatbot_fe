"use client";

import './globals.css';
import React from 'react';
import TopNav from '@/components/topNav';
import Container from '@/components/container';
import { ActiveItemProvider } from '../components/dropDown/activeItemContext';


const Home: React.FC = () => {
  return (
    <div className="w-full flex-col justify-start items-center inline-flex">
      <ActiveItemProvider>
        <TopNav />
        <Container />
      </ActiveItemProvider>
    </div>
  );
}

export default Home;