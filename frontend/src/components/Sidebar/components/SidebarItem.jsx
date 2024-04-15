import React, { useContext } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { Link } from 'react-router-dom';

const SidebarItem = ({ title, icon, to }) => {
  const { activeItem, setActiveItem } = useContext(SidebarContext);

  const isActive = activeItem === title;

  const handleClick = () => {
    setActiveItem(title);
  };

  return (
    <Link to={to} className={`p-3  rounded my-1 flex items-center space-x-3 w-full hover:bg-gray-700 transition-all ${isActive ? 'bg-gray-600 text-white' : ''}`} onClick={handleClick}>
      <div className={`text-[22px] ${isActive ? 'text-white' : 'text-gray-200'}`}>
        {icon}
      </div>
      <p className={`${isActive ? 'text-white' : 'text-gray-200'}`}>
        {title}
      </p>
    </Link>
  );
};

export default SidebarItem;
