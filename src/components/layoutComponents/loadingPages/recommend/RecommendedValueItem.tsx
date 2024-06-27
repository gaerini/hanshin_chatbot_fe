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
        <button className="btnStyle-l neutralBtnStyle-default border border-neutral-200 flex-1
                           hover:neutralBtnStyle-hover active:neutralBtnStyle-active
                           flex-col justify-start items-start gap-2 inline-flex"
                onClick={handleClick}>
            <Icon name ="pencil" width={20} height={20} />
            <div className="self-stretch h-full text-paragraph-l text-left font-medium">
                {questionValue}
            </div>
            <div className="self-stretch justify-end items-start gap-2.5 inline-flex">
            </div>
        </button>
    );
};

export default RecommendedValueItem;