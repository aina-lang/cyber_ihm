import React, { useContext, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const SidebarGroupItem = ({ title, icon, children }) => {
  const { activeGroup, setActiveGroup, collapsed } = useContext(SidebarContext);
  const [iscollapsed, setIsCollapsed] = useState(false);

  const handleClick = () => {
    setActiveGroup(activeGroup === title ? null : title);
    console.log(activeGroup, title);
    setIsCollapsed(!iscollapsed);
  };

  return (
    <div>
      <button
        className={` rounded my-1 flex items-center justify-between w-full hover:bg-[#d9ebed]/50 transition-all ${
          iscollapsed ? " text-[#4183bb]" : ""
        }`}
        onClick={handleClick}
      >
        <div
          className={`text-[22px] h-[45px] min-w-[45px] rounded flex justify-center items-center ${
            iscollapsed ? "text-[#4183bb]" : "text-[#505252]"
          }`}
        >
          {icon}
        </div>
        <p
          className={` ml-3 ${
            iscollapsed ? "text-[#4183bb]" : "text-[#505252]"
          }  ${collapsed ? "" : "w-0 hidden"}`}
        >
          {title}
        </p>
        {collapsed && (
          <div className="ml-auto">
            {iscollapsed ? (
              <HiChevronUp className="text-[#4183bb]text-lg" />
            ) : (
              <HiChevronDown className="text-[#505252] text-lg" />
            )}
          </div>
        )}
      </button>

      <div className={`${collapsed?'pl-5':''}`}>
        {
          // activeGroup === title &&
          iscollapsed && children
        }
      </div>
    </div>
  );
};

export default SidebarGroupItem;
