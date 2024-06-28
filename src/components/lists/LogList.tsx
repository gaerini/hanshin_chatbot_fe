import React from 'react';

interface LogListProps {
    firstQuery : string;
    onClick : ()=>void;
}

const LogList: React.FC<LogListProps> = ({ firstQuery, onClick }) => {

    return (
        <button className="w-[304px] btnStyle-m justify-start items-center gap-2 inline-flex
                        neutralBtnStyle-default hover:neutralBtnStyle-hover active:neutralBtnStyle-active"
                onClick={onClick}>
            <div className="text-paragraph-m font-normal truncate">{firstQuery}</div>
        </button>
    );
};

export default LogList;
