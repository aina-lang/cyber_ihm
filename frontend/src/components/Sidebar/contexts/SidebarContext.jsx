import React, { createContext, useState } from "react";

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
    const [activeItem, setActiveItem] = useState(null);
    const [activeGroup, setActiveGroup] = useState(null);
    const [collapsed, setCollapsed] = useState(true);

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handleSetActiveItem = (item) => {
        setActiveItem(item);
    };

    const handleSetActiveGroup = (group) => {
        setActiveGroup(group);
    };

    const handleItemClick = (clickedItem) => {
        // Désactive tous les items
        const updatedItems = React.Children.map(children, (child) => {
            if (child.props.title === clickedItem) {
                return React.cloneElement(child, { isActive: true });
            } else {
                return React.cloneElement(child, { isActive: false });
            }
        });
        setActiveItem(clickedItem);
    };

    return (
        <SidebarContext.Provider
            value={{
                activeItem,
                collapsed,
                activeGroup,
                setActiveItem: handleSetActiveItem,
                setActiveGroup: handleSetActiveGroup,
                setCollapsed: handleCollapse,
                handleItemClick
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export { SidebarContext, SidebarProvider };
