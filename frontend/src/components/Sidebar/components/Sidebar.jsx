import React, { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";

const Sidebar = ({ children }) => {
  const { collapsed } = useContext(SidebarContext);

  return (
    <aside className={`bg-gray-900   ${collapsed ? 'w-[300px]' : 'w-[80px]'} h-full overflow-y-auto shadow-lg`}>
      <div className="">{children}</div>
    </aside>
  );
};

export default Sidebar;
