import React, { useContext } from "react";
import { HiMenu } from "react-icons/hi";
import { SidebarContext } from "../contexts/SidebarContext";

function SidebarLogo({
  logoUrl,
  titlePartOne,
  titlePartTwo,
  logoClassName,
  titleClassName,
  titleSpanClassName,
}) {
  const { collapsed, setCollapsed } = useContext(SidebarContext);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  if (!logoUrl && !titlePartOne && !titlePartTwo) {
    return null;
  }

  return (
    <div className="p-4 flex items-center justify-between border-b  py-5 overflow-hidden max-h-full">
      {collapsed && logoUrl && (
        <img src={logoUrl} alt="Logo" className={logoClassName} />
      )}
      { (titlePartOne || titlePartTwo) && (
        <h2 className={`${!collapsed &&'w-0 hidden '} ${titleClassName} max-h-[40px] overflow-hidden`}>
          {titlePartOne}
          {titlePartTwo && (
            <span className={` ${titleSpanClassName}`}>{titlePartTwo}</span>
          )}
        </h2>
      )}
      <button onClick={toggleSidebar}>
        {collapsed ? (
          <HiMenu size={30} className="text-gray-700" />
        ) : (
          <HiMenu size={30} className="text-gray-700" />
        )}
      </button>
    </div>
  );
}

export default SidebarLogo;
