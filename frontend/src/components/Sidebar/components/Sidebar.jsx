import React, { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";

const Sidebar = ({ children ,className}) => {
  const { collapsed } = useContext(SidebarContext);

  return (
    <aside className={`bg-white z-50 rounded-tr-md transition-all overflow-hidden dark:bg-[#1d1d1d]  ${collapsed ? 'w-[300px]' : 'w-[80px]'} h-full overflow-y-auto shadow-md ${className}` }>
      <div className="h-full">{children}</div>
    </aside>
  );
};

export default Sidebar;
