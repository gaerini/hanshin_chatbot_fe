'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ActiveItemContextProps {
    selectedProjectForChat: string | null;
    setSelectedProjectForChat: (projectName: string | null) => void;
}

const ActiveItemContext = createContext<ActiveItemContextProps | undefined>(undefined);

export const useActiveItemContext = () => {
    const context = useContext(ActiveItemContext);
    if (!context) {
        throw new Error('useActiveItemContext must be used within an ActiveItemProvider');
    }
    return context;
};

interface ActiveItemProviderProps {
    children: ReactNode;
}

export const ActiveItemProvider: React.FC<ActiveItemProviderProps> = ({ children }) => {
    const [selectedProjectForChat, setSelectedProjectForChat] = useState<string | null>(null);

    return (
        <ActiveItemContext.Provider value={{ selectedProjectForChat, setSelectedProjectForChat }}>
            {children}
        </ActiveItemContext.Provider>
    );
};
