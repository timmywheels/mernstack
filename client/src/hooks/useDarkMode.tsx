import React, { useState } from 'react';

const useDarkMode = (initialState = localStorage.theme === 'dark') => {
    const [isDarkMode, setIsDarkMode] = useState(initialState);
    const toggleDarkMode = (isDarkMode) => {
        if (isDarkMode) {
            localStorage.theme = 'dark'
            document.documentElement.classList.add('dark')
        } else {
            localStorage.theme = 'light'
            document.documentElement.classList.remove('dark')
        }
        setIsDarkMode(isDarkMode)
    }
    return [isDarkMode, toggleDarkMode]
};

export default useDarkMode;
