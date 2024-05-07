import React, { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { Link } from "react-router-dom";

const SidebarItem = ({ title, icon, to }) => {
  const { activeItem, setActiveItem,collapsed, } = useContext(SidebarContext);

  const isActive = activeItem === title;

  const handleClick = () => {
    setActiveItem(title);
  };

  return (
    <Link
      to={to}
      className={`rounded my-1 flex items-center min-w-[40px] overflow-hidden space-x-3 w-full transition-all ${
        isActive ? "bg-[#6298c7]" : " hover:bg-[#d9ebed]"
      }`}
      onClick={handleClick}
    >
      <div
        className={`text-[22px] h-[45px] min-w-[45px] rounded flex justify-center items-center  ${
          isActive ? "text-white bg-[#6298c7]" : "text-[#505252]"
        }`}
      >
        {icon}
      </div>
      <p className={`${isActive ? "text-white" : "text-[#505252]"} ${collapsed?'':'w-0 hidden'}`}>{title}</p>
    </Link>
  );
};

export default SidebarItem;
