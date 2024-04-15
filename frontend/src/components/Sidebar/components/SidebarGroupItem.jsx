import React, { useContext, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const SidebarGroupItem = ({ title, icon, children }) => {
  const { activeGroup, setActiveGroup } = useContext(SidebarContext);
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = () => {
    setActiveGroup(activeGroup === title ? null : title);
    console.log(activeGroup, title);
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <button
        className={`p-3 rounded my-1 flex items-center justify-between w-full hover:bg-gray-700 transition-all ${
          collapsed ? "bg-gray-600 text-white" : ""
        }`}
        onClick={handleClick}
      >
        <div
          className={`text-[22px] ${
            collapsed ? "text-white" : "text-gray-200"
          }`}
        >
          {icon}
        </div>
        <p className={`${collapsed ? "text-white" : "text-gray-200"} ml-3`}>
          {title}
        </p>
        <div className="ml-auto">
          {collapsed ? (
            <HiChevronUp className="text-white text-lg" />
          ) : (
            <HiChevronDown className="text-white text-lg" />
          )}
        </div>
      </button>

      <div className="pl-5">
        {
          // activeGroup === title &&
          !collapsed && children
        }
      </div>
    </div>
  );
};

export default SidebarGroupItem;
