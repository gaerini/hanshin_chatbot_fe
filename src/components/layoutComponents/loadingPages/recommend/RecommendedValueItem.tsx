import React from "react";
import Icon from "../../../icon/Icon";

import { useChooseRecommendContext } from "./ChooseRecommendContext";

interface RecommendedValueItemProps {
    questionValue : string;
  }

const RecommendedValueItem: React.FC<RecommendedValueItemProps> = ({questionValue}) => {
    const { handleSendRequest } = useChooseRecommendContext();

    const handleClick = () => {
        handleSendRequest(questionValue);
    };

    return (
        <button className="btnStyle-l neutralBtnStyle-default border border-neutral-200 flex-1 w-full
                           hover:neutralBtnStyle-hover active:neutralBtnStyle-active min-h-[120px]
                           flex-col justify-start items-start gap-2 inline-flex"
                onClick={handleClick}>
            <Icon name ="pencil" width={20} height={20} />
            <div className="self-stretch text-paragraph-l text-left font-medium">
                {questionValue}
            </div>
            <div className="self-stretch justify-end items-start gap-2.5 inline-flex">
            </div>
        </button>
    );
};

export default RecommendedValueItem;