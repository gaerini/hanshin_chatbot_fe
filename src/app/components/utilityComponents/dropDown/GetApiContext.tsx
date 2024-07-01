'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GetApiContextProps {
  getApi: boolean;
  setGetApi: (value: boolean) => void;
}

const GetApiContext = createContext<GetApiContextProps | undefined>(undefined);

export const GetApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [getApi, setGetApi] = useState(true);
  return (
    <GetApiContext.Provider value={{ getApi, setGetApi }}>
      {children}
    </GetApiContext.Provider>
  );
};

export const useGetApiContext = () => {
  const context = useContext(GetApiContext);
  if (!context) {
    throw new Error('useGetApiContext must be used within a GetApiProvider');
  }
  return context;
};
