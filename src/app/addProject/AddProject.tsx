import React from 'react';
import Icon from '../components/basicComponents/icon/Icon';
import InputFile from "@/app/components/basicComponents/inputs/InputFile";
import LargeHeader from "@/app/components/basicComponents/headers/LargeHeader";
import InputForm from '@/app/components/basicComponents/inputs/InputForm';

// interface AddProjectProps {
// }

const AddProject: React.FC = () => {
  return (
    <div className='w-full flex-grow flex-col overflow-y-auto h-full'>
        <div className='w-full flex-grow flex-col overflow-y-auto'>
            <LargeHeader leftIconName="dotsPlus" 
                        label="프로젝트 생성" 
                        siteMap=""  />
            <div className='w-full flex-col p-4 justify-center items-start inline-flex gap-8'>
                <InputForm label='프로젝트 이름' placeholder='프로젝트 이름을 입력하세요'/>
                <InputFile 
                    label="파일 업로드"
                    caption="챗봇이 학습할 프로젝트 계약 서류를 업로드 해주세요"
                    value="" />
            </div>
        </div>
        <div className="w-full p-4 justify-end items-center gap-1 inline-flex">
          <button className="btnStyle-l blueBtnStyle-default hover:blueBtnStyle-hover active:blueBtnStyle-active
                          border border-neutral-200 gap-2">
            <Icon name="plus" width={20} height={20} />
            프로젝트 생성 완료
          </button>
      </div>
    </div>
  );

}

export default AddProject;