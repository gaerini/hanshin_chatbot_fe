import React from 'react';
import Icon, {IconName} from '../icon/Icon';

interface FileListProps {
    fileName : string;
}

const FileList: React.FC<FileListProps> = ({ fileName }) => {

    return (
        <div className="w-full p-2.5 rounded-[10px] justify-start items-center gap-2 inline-flex
                        bg-neutral-100 dark:fill-neutral-800">
            <div className="justify-start items-center gap-2 flex
                           text-neutral-600 fill-neutral-400 dark:text-neutral-300 dark-neutral-400">
                <Icon name="file_dark" width={12} height={12} />
                <div className="text-paragraph-m font-normal">{fileName}</div>
            </div>
        </div>
    );
}; 

export default FileList;
