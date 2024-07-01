import React from "react";
import Icon, { IconName } from "./icon/Icon";

interface AlertProps {
  iconName: IconName;
  iconSize: number;
  alertLabel: JSX.Element | string;
  alertStyle: string;
  showIcon?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  iconName,
  iconSize,
  alertLabel,
  alertStyle,
  showIcon = true,
}) => {
  return (
    <div className={alertStyle}>
      {showIcon && <Icon name={iconName} width={iconSize} height={iconSize} />}
      {alertLabel}
    </div>
  );
};

export default Alert;
0;
