import React from 'react';
import LogSelector from '../../lists/LogList';

interface DailyLogSelectorProps {
    memoryId: string;
    date : string;
    firstQueries : string;
    projectName: string;
    onSelectMemory: (memoryId: string, projectName: string) => void;
}

const DailyLogSelector: React.FC<DailyLogSelectorProps> = ({ memoryId, date, firstQueries, projectName, onSelectMemory }) => {

    return (
        <div className="min-w-[336px] px-4 py-2 flex-col justify-start items-start gap-2 inline-flex">
            <div className="w-full px-2.5 py-1 justify-start items-start gap-2.5 inline-flex">
                <div className=" text-neutral-700 dark:text-neutral-300 text-paragraph-m font-semibold">{date}</div>
            </div>
            <LogSelector 
                firstQuery={firstQueries} 
                projectName={projectName}
                onClick={() => {
                    console.log('DailyLogSelector onSelectMemory', memoryId);
                    onSelectMemory(memoryId, projectName);
                }} />
        </div>
    );
};

export default DailyLogSelector;
