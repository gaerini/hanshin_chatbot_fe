"use client";

import React from "react";
import RecommendedValueItem from "./RecommendedValueItem";

const RecommendedValue: React.FC = () => {
    return (
    <div className="w-full h-full mt-[100px] p-4 flex flex-col justify-center items-center gap-4">
        <div className="w-full flex justify-center items-start gap-4">
            <RecommendedValueItem questionValue="공사도급계약서를 요약해줘"/>
            <RecommendedValueItem questionValue="공사 개요 알려줘"/>
            <RecommendedValueItem questionValue="이자율과 지연이자율이 얼마야?"/>
        </div>
    </div>
    );
};

export default RecommendedValue;