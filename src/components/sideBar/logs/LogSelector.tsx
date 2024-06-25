import React from 'react';

interface LogSelectorProps {
    firstQuery : string;
}

const LogSelector: React.FC<LogSelectorProps> = ({ firstQuery }) => {

    return (
        <button className="w-[304px] btnStyle-m justify-start items-center gap-2 inline-flex
                        neutralBtnStyle-default hover:neutralBtnStyle-hover active:neutralBtnStyle-active">
            <div className="text-paragraph-m font-normal truncate">{firstQuery}</div>
        </button>
    );
};

export default LogSelector;
