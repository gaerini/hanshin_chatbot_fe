import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ActiveItemContextProps {
    selectedProject: string | null;
    setSelectedProject: (projectName: string | null) => void;
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
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    return (
        <ActiveItemContext.Provider value={{ selectedProject, setSelectedProject }}>
            {children}
        </ActiveItemContext.Provider>
    );
};
