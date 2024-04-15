import React, { useContext } from 'react';
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { SidebarContext } from '../contexts/SidebarContext'; 

function SidebarLogo({ logoUrl, titlePartOne, titlePartTwo, logoClassName, titleClassName, titleSpanClassName }) {
    const { collapsed, setCollapsed } = useContext(SidebarContext);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    if (!logoUrl && !titlePartOne && !titlePartTwo) {
        return null;
    }

    return (
        <div className="p-3 flex items-center justify-between border-b border-gray-700 py-5">
            {logoUrl && <img src={logoUrl} alt="Logo" className={logoClassName} />}
            {(titlePartOne || titlePartTwo) && (
                <h2 className={titleClassName}>
                    {titlePartOne}
                    {titlePartTwo && <span className={titleSpanClassName}>{titlePartTwo}</span>}
                </h2>
            )}
            <button onClick={toggleSidebar}>
                {collapsed ? <HiChevronUp /> : <HiChevronDown />}
            </button>
        </div>
    );
}

export default SidebarLogo;
