"use client";

import './globals.css';
import React from 'react';
import TopNav from '@/components/topNav';
import Container from '@/components/container';

const Home: React.FC = () => {
  return (
    <div className="w-full flex-col justify-start items-center inline-flex">
      <TopNav />
      <Container />
    </div>
  );
}

export default Home;