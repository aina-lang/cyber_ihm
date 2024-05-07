import React, { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";

const Sidebar = ({ children }) => {
  const { collapsed } = useContext(SidebarContext);

  return (
    <aside className={`bg-white z-50 transition-all overflow-hidden dark:bg-[#1d1d1d]  ${collapsed ? 'w-[300px]' : 'w-[80px]'} h-full overflow-y-auto shadow-sm`}>
      <div className="h-full">{children}</div>
    </aside>
  );
};

export default Sidebar;
