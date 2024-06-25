'use client'
import React, { useState } from 'react';
import Icon, { IconName } from './icon/Icon';

interface TogglerProps {
    iconNameOn : IconName;
    iconNameOff : IconName
    labelOn : string;
    labelOff : string;
    initialState?: boolean;
    onToggle?: (state: boolean) => void;
}

const Toggler: React.FC<TogglerProps> = ({ iconNameOn, iconNameOff, labelOn, labelOff, initialState = false, onToggle}) => {
    const [isOn, setIsOn] = useState(initialState);

    const handleToggle = () => {
        const newState = !isOn;
        setIsOn(newState);
        if (onToggle) {
        onToggle(newState);
        }
    };

    return (
        <button onClick={handleToggle}
                className={`w-[121px] h-11 p-1.5 rounded-2xl justify-start items-center inline-flex text-paragraph-m font-semibold
                         ${isOn ? 'bg-blue-100 text-blue-original'   //on
                                : 'bg-neutral-100 text-neutral-400'}`}> 
            {isOn ? <div className='w-full justify-start items-center inline-flex'>
                        <p className='w-[77px]'>{labelOn}</p>
                        <div className='w-8 h-8 p-1.5 bg-blue-original rounded-[10px] justify-start items-center gap-2.5 inline-flex'>
                            <Icon name={iconNameOn} width={20} height={20} className='fill-neutral-white' />
                        </div>
                    </div>
                  : <div className='w-full justify-start items-center inline-flex'>
                        <div className='w-8 h-8 p-1.5 bg-neutral-400 rounded-[10px] justify-start items-center gap-2.5 inline-flex'>
                            <Icon name={iconNameOff} width={20} height={20} className='fill-neutral-white' />
                        </div>
                        <p className='w-[77px]'>{labelOff}</p>
                    </div>
            }
        </button>
    );
};

export default Toggler;
