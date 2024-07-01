'use client'

import React, { useState, useRef } from "react";
import Icon from "../../basicComponents/icon/Icon";
import FileList from "../lists/FileList";

interface InputFileProps {
    label: string;
    caption: string;
    value: string;
}

const InputFile: React.FC<InputFileProps> = ({
    label,
    caption,
    value,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dropAreaRef = useRef<HTMLDivElement | null>(null);
    const [files, setFiles] = useState<string[]>(["1","2","3"]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map(file => file.name);
            setFiles(fileArray);
        }
    };

    //드래그 앤 드랍으로 파일 업로드
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (dropAreaRef.current) {
            dropAreaRef.current.classList.add("drag-over");
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        if (dropAreaRef.current) {
            dropAreaRef.current.classList.remove("drag-over");
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (dropAreaRef.current) {
            dropAreaRef.current.classList.remove("drag-over");
        }
        if (e.dataTransfer.files) {
            const fileArray = Array.from(e.dataTransfer.files).map(file => file.name);
            setFiles(fileArray);
        }
    };

    return (
        <div className="w-full flex-col justify-center items-start gap-2 inline-flex">
            <div className="pl-2 justify-center items-start gap-1 flex-col inline-flex font-normal">
                <p className="text-paragraph-l text-neutral-700 dark:text-neutral-300">{label}</p>
                <p className="text-caption text-neutral-400 ">{caption}</p>
            </div>

            <div ref={dropAreaRef}
                 className="w-full"
                 onDragOver={handleDragOver}
                 onDragLeave={handleDragLeave}
                 onDrop={handleDrop}>
                <input type='file' 
                    ref={inputRef}
                    onChange={handleFileChange}
                    multiple
                    style={{ display: "none" }}/>
                <div className="w-full h-[134px] px-2.5 py-4 bg-white rounded-[10px] border border-neutral-200 dark:border-neutral-800
                                flex-col justify-center items-center gap-4 inline-flex
                                text-neutral-400 text-paragraph-m text-center">
                    <span>첨부할 파일을 여기에 끌어다놓거나 파일을 직접 선택해주세요.</span>
                    <button className="neutralBtnStyle-default hover:neutralBtnStyle-hover active:neutralBtnStyle-active
                                       border border-neutral-200 dark:border-neutral-800
                                       btnStyle-m text-paragraph-m gap-2">
                        <Icon name="upload" width={18} height={18}/>
                        파일 첨부하기
                    </button>
                </div>
            </div>

            <div className="w-full flex-col justify-center items-start gap-1 inline-flex">
                <div className="w-full pl-2 items-center inline-flex text-paragraph-m text-neutral-700 dark:text-neutral-300">
                    <p className="font-bold">{files.length}개 </p> <p className="font-normal"> / 20개</p>
                </div>
                {files.map((fileName, index) => (
                    <FileList key={index} fileName={fileName} />
                ))}
            </div>
        </div>
    );
};

export default InputFile;
