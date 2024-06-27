import React from "react";

interface InputFormProps {
    label: string;
    placeholder: string;
    // value: string;
    // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({
    label,
    placeholder,
}) => {
  return (
    <div className="w-full flex-col justify-center items-start gap-2 inline-flex">
        <div className="pl-2 justify-center items-start gap-2.5 inline-flex">
            <p className="text-neutral-700 dark:text-neutral-300 text-paragraph-l font-normal">{label}</p>
        </div>
        <input className="w-full p-2.5 border rounded-[10px] inputStyle-default text-paragraph-l justify-start items-center gap-2.5 inline-flex"
               placeholder={placeholder}>
        </input>
    </div>
  );
};

export default InputForm;
