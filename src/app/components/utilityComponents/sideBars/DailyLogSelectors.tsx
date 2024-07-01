import React  from 'react';
import LogList from '@/app/components/basicComponents/lists/LogList';

interface DailyLogSelectorProps {
    memoryIds: Array<{ memory_id: string, project_name: string }>;
    date: string;
    onSelectMemory: (memoryId: string, projectName: string) => void;
}

const DailyLogSelector: React.FC<DailyLogSelectorProps> = ({ memoryIds, date, onSelectMemory }) => {

    return (
        <div className="min-w-[336px] px-4 py-2 flex-col justify-start items-start gap-2 inline-flex">
            <div className="w-full px-2.5 py-1 justify-start items-start gap-2.5 inline-flex">
                <div className=" text-neutral-700 dark:text-neutral-300 text-paragraph-m font-semibold">{date}</div>
            </div>
            {memoryIds.map((memory) => (
                <LogList
                    key={memory.memory_id}
                    firstQuery={memory.project_name}
                    projectName={memory.project_name}
                    onClick={() => {
                        //console.log('DailyLogSelector onSelectMemory', memory.memory_id);
                        onSelectMemory(memory.memory_id, memory.project_name);
                    }} 
                />
            ))}
        </div>
    );
};

export default DailyLogSelector;
