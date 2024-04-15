import React, { useContext, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";

const SidebarGroupItem = ({ title, icon, children }) => {
  const { activeGroup, setActiveGroup } = useContext(SidebarContext);
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = () => {
    setActiveGroup(activeGroup === title ? null : title);
    setCollapsed(false);
  };

  return (
    <div>
      <button
        className={`p-3  rounded my-1 flex items-center space-x-3 w-full hover:bg-gray-700 transition-all ${
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
        <p className={`${collapsed ? "text-white" : "text-gray-200"}`}>
          {title}
        </p>
      </button>

      <div className="pl-5">
      {activeGroup === title && !collapsed && children}
      </div>
    </div>
  );
};

export default SidebarGroupItem;
