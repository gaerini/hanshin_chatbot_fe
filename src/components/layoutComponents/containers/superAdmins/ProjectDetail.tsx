import React from 'react';
import Icon from '../../../icon/Icon';
import FileList from '../../../lists/FileList';

interface ProjectDetailProps {
    projectName: string;
    setActivePage: (page: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({projectName, setActivePage}) => {
  return (
    <div className ="w-full p-4 bg-neutral-white flex-col justify-center items-start gap-2 inline-flex">
        <div className="pl-2 flex-col justify-start items-start flex">
            <p className="text-neutral-700 text-paragraph-l font-semibold ">학습한 서류 목록</p>
        </div>
        <div className='w-full inline-flex flex-col gap-2'>
          <FileList fileName='어쩌고 파일의 어쩌고저쩌고'/>
          <FileList fileName='어쩌고 파일의 어쩌고저쩌고'/>
          <FileList fileName='어쩌고 파일의 어쩌고저쩌고'/>
        </div>
        <div className="w-full py-4 justify-end items-center gap-1 inline-flex">
          <button className="btnStyle-l neutralBtnStyle-default hover:neutralBtnStyle-hover active:neutralBtnStyle-active
                          border border-neutral-200 gap-2"
                          onClick={() => setActivePage('AddPapers')}>
            <Icon name="plus" width={20} height={20} />
            서류 추가하기
          </button>
        </div>
    </div>
  );

}

export default ProjectDetail;