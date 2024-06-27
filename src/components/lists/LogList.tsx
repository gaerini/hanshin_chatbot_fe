import React from 'react';

interface LogListProps {
    firstQuery : string;
}

const LogList: React.FC<LogListProps> = ({ firstQuery }) => {

    return (
        <button className="w-[304px] btnStyle-m justify-start items-center gap-2 inline-flex
                        neutralBtnStyle-default hover:neutralBtnStyle-hover active:neutralBtnStyle-active">
            <div className="text-paragraph-m font-normal truncate">{firstQuery}</div>
        </button>
    );
};

export default LogList;
