import React from "react";
import LogSelector from "../../lists/LogList";

interface DailyLogSelectorProps {
  memoryIds: Array<{
    first_query: string;
    memory_id: string;
    project_name: string;
  }>;
  date: string;
  onSelectMemory: (memoryId: string, projectName: string) => void;
}

const getFormattedQuery = (query: string) => {
  return query?.replace("HumanMessage: ", "");
};

const DailyLogSelector: React.FC<DailyLogSelectorProps> = ({
  memoryIds,
  date,
  onSelectMemory,
}) => {
  return (
    <div className="min-w-[336px] px-4 py-2 flex-col justify-start items-start gap-2 inline-flex">
      <div className="w-full px-2.5 py-1 justify-start items-start gap-2.5 inline-flex">
        <div className=" text-neutral-700 dark:text-neutral-300 text-paragraph-m font-semibold">
          {date}
        </div>
      </div>
      {memoryIds
        .filter((memory) => memory.first_query !== null)
        .map((memory) => (
          <LogSelector
            key={memory.memory_id}
            firstQuery={getFormattedQuery(memory.first_query)}
            projectName={memory.project_name}
            onClick={() => {
              onSelectMemory(memory.memory_id, memory.project_name);
            }}
          />
        ))}
    </div>
  );
};

export default DailyLogSelector;
