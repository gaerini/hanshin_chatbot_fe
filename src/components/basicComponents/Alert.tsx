import React from 'react';
import Icon, {IconName} from './icon/Icon';

interface AlertProps {
    iconName : IconName;
    iconSize : number;
    alertLabel : string;
    alertStyle : string;
}

const Alert: React.FC<AlertProps> = ({ iconName, iconSize, alertLabel, alertStyle}) => {

    return (
        <div className = {alertStyle}>
                <Icon name = {iconName} width={iconSize} height={iconSize} />
            {alertLabel}
        </div>
    );
}; 

export default Alert;
