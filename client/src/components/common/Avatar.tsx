import React from 'react';
import {UserCircle} from "heroicons-react";


interface IAvatar {
    size: 4 | 6 | 8 | 10 | 12 | 14 | 24 | 48;
    avatarUrl?: string;
    className?: string
}

const Avatar: React.FC<IAvatar> = ({ size = 14, avatarUrl, className }) => {
    return avatarUrl ? <img className={`${className ? className: ""} h-${size} w-${size} rounded-full`} src={avatarUrl} alt={`Avatar`} />
        : <UserCircle className={`h-${size} w-${size} text-white`}/>
};

export default Avatar;
