import { useEffect, useState } from "react";

const ColorMode = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const saveThemeToLocalStorage = theme => localStorage.setItem('theme', theme);

  const changeStyles = isDarkMode => {
    const root = document.querySelector(':root');
    root.style.setProperty('--body-bg-color', isDarkMode ? '#121212' : '#fafafa');
    root.style.setProperty('--author-name-color', isDarkMode ? '#fff' : 'rgba(0, 0, 0, 0.7)');
    root.style.setProperty('--keywords-color', isDarkMode ? '#fff' : '#000');
    root.style.setProperty('--box-shadow-color', isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--input-bg-color', isDarkMode ? '#000' : '#fff');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    savedTheme && savedTheme === 'light' ? setIsDarkMode(false) : setIsDarkMode(true);
  }, []);

  useEffect(() => {
    saveThemeToLocalStorage(isDarkMode ? 'dark' : 'light');
    changeStyles(isDarkMode);
  }, [isDarkMode]);

  return (
    <div className='color-mode-container'>
      <svg onClick={() => setIsDarkMode(!isDarkMode)} className='svg-moon' width="377" height="340" viewBox="0 0 377 340" fill="black" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
          <path d="M188.5 340C281.821 340 364.269 276.438 376.9 193.044C377.59 188.434 374.667 184.017 369.857 182.374C365.024 180.729 359.589 182.305 356.752 186.187C332.062 219.708 288.217 239.727 243.725 239.727C170.638 239.727 111.186 186.109 111.186 120.195C111.186 80.0695 133.383 40.5166 170.551 18.2506C174.845 15.6827 176.602 10.7799 174.78 6.43162C172.957 2.0933 168.039 -0.494549 162.948 0.0798652C70.4791 11.4705 0 85.8382 0 170C0 263.374 84.9649 340 188.5 340Z" fill={isDarkMode ? 'black' : 'white'} />
        </g>
      </svg>
    </div >
  );
};

export default ColorMode;