import React from 'react';

interface LogListProps {
    firstQuery : string;
    onClick: (projectName: string) => void;
    projectName: string;
}

const LogList: React.FC<LogListProps> = ({ firstQuery, onClick, projectName }) => {

    return (
        <button className="w-[304px] btnStyle-m justify-start items-center gap-2 inline-flex
                        neutralBtnStyle-default hover:neutralBtnStyle-hover active:neutralBtnStyle-active"
                onClick={() =>{
                    console.log('LogList clicked');
                    onClick(projectName);}}>
            <div className="text-paragraph-m font-normal truncate">{firstQuery}</div>
        </button>
    );
};

export default LogList;
