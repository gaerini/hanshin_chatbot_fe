import React from "react";
import Icon, { IconName } from "./icon/Icon";

interface BadgeProps {
  iconName: IconName;
  badgeLabel: string;
  badgeStyle: string;
  showIcon?: boolean;
}


const Badge: React.FC<BadgeProps> = ({
  iconName,
  badgeLabel,
  badgeStyle,
  showIcon= true,
}) => {
  return (
    <div
      className={`px-1.5 py-0.5 rounded-lg justify-start items-center gap-0.5 inline-flex
                        text-caption font-medium ${badgeStyle} whitespace-nowrap`}
    >
      {showIcon && <Icon name={iconName} width={12} height={12}/>}
      {badgeLabel}
    </div>
  );
};

export default Badge;
