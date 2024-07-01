import React from "react";
import Icon, {IconName} from "../icon/Icon";

interface InputIconProps {
  iconName: IconName;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; // 비밀번호 입력을 위한 type 속성
}

const InputIcon: React.FC<InputIconProps> = ({
  iconName,
  placeholder,
  value,
  onChange,
  type = 'text'
}) => {
  return (
    <div className="w-[343px] justify-start items-center inline-flex">
        <div className="w-[35px] h-11 p-2.5 inputStyle-default border-l border-t border-b
                        rounded-tl-[10px] rounded-bl-[10px] justify-start items-center gap-2.5 inline-flex">
            <Icon name={iconName} width={15} height={15}/>
        </div>
        <input className="w-full h-11 pr-2.5 py-2.5 inputStyle-default
                         rounded-tr-[10px] rounded-br-[10px] border-r border-t border-b
                         justify-start items-center gap-2.5 inline-flex"
               placeholder={placeholder}
               value={value}
               onChange={onChange}
               type={type}>
        </input>

    </div>
  );
};

export default InputIcon;
