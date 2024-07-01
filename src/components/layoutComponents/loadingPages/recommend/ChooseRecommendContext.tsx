
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChooseRecommendContextProps {
  recommendedValue: string;
  handleSendRequest: (value: string) => void;
}

const ChooseRecommendContext = createContext<ChooseRecommendContextProps | null>(null);

export const useChooseRecommendContext = () => {
  const context = useContext(ChooseRecommendContext);
  if (!context) {
    throw new Error('useChooseRecommendContext must be used within an ChooseRecommendContextProvider');
  }
  return context;
};

interface ChooseRecommendContextProviderProps {
  children: ReactNode;
}

export const ChooseRecommendContextProvider: React.FC<ChooseRecommendContextProviderProps> = ({ children }) => {
  const [recommendedValue, setRecommendedValue] = useState('');

  const handleSendRequest = (value: string) => {
    setRecommendedValue(value);
  };


  return (
    <ChooseRecommendContext.Provider value={{ recommendedValue, handleSendRequest }}>
      {children}
    </ChooseRecommendContext.Provider>
  );
};
