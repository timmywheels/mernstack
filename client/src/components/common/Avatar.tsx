import React from 'react';
import Loader from './Loader';

interface IAvatar {
    size: 4 | 6 | 8 | 10 | 12 | 14 | 24 | 48;
    avatarUrl?: string;
    className?: string
}

const Avatar: React.FC<IAvatar> = ({ size, avatarUrl, className }) => {
    return <img className={`${className ? className: ""} h-${size} w-${size} rounded-full`} src={avatarUrl} alt={`Avatar`} />;
};

export default Avatar;
