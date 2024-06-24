import React from "react";
import Icon, {IconName} from "../icon/Icon";

interface InputIconProps {
  iconName: IconName;
  placeholder: string;
  
}

const InputIcon: React.FC<InputIconProps> = ({
  iconName,
  placeholder,
}) => {
  return (
    <div className="w-[343px] justify-start items-center inline-flex">
        <div className="w-[35px] h-11 p-2.5 neutralBtnStyle-default border-l border-t border-b border-neutral-300
                        rounded-tl-[10px] rounded-bl-[10px] justify-start items-center gap-2.5 inline-flex">
            <Icon name={iconName} width={15} height={15}/>
        </div>
        <input className="w-full h-11 pr-2.5 py-2.5 neutralBtnStyle-default focus:outline-none
                         rounded-tr-[10px] rounded-br-[10px] border-r border-t border-b border-neutral-300 
                         justify-start items-center gap-2.5 inline-flex"
               placeholder={placeholder}>
        </input>

    </div>
  );
};

export default InputIcon;
