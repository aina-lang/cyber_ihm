import React, { createContext, useState, useEffect } from "react";

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
    const [activeItem, setActiveItem] = useState(null);
    const [activeGroup, setActiveGroup] = useState(null);
    const [collapsed, setCollapsed] = useState(true);
    const [expandedGroups, setExpandedGroups] = useState([]);

    useEffect(() => {
        // Récupérer l'état de l'élément actif depuis le localStorage lors du montage
        const storedActiveItem = localStorage.getItem("activeItem");
        if (storedActiveItem) {
            setActiveItem(storedActiveItem);
        }

        // Récupérer le groupe de l'élément actif depuis le localStorage
        const storedActiveGroup = localStorage.getItem("activeGroup");
        if (storedActiveGroup) {
            setActiveGroup(storedActiveGroup);
            // Étendre le groupe contenant l'élément actif
            setExpandedGroups((prevExpandedGroups) => [
                ...prevExpandedGroups,
                storedActiveGroup
            ]);
        }
    }, []);

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handleSetActiveItem = (item, group) => {
        setActiveItem(item);
        // Stocker l'élément actif dans le localStorage
        localStorage.setItem("activeItem", item);

        setActiveGroup(group);
        // Stocker le groupe de l'élément actif dans le localStorage
        localStorage.setItem("activeGroup", group);

        // Étendre le groupe contenant l'élément actif
        setExpandedGroups((prevExpandedGroups) => [
            ...prevExpandedGroups,
            group
        ]);
    };

    const handleSetActiveGroup = (group) => {
        setActiveGroup(group);
        // Stocker le groupe actif dans le localStorage
        localStorage.setItem("activeGroup", group);
    };

    const handleItemClick = (clickedItem, group) => {
        setActiveItem(clickedItem);
        // Stocker l'élément actif dans le localStorage
        localStorage.setItem("activeItem", clickedItem);

        setActiveGroup(group);
        // Stocker le groupe de l'élément actif dans le localStorage
        localStorage.setItem("activeGroup", group);

        // Étendre le groupe contenant l'élément actif
        setExpandedGroups((prevExpandedGroups) => [
            ...prevExpandedGroups,
            group
        ]);
    };

    return (
        <SidebarContext.Provider
            value={{
                activeItem,
                collapsed,
                activeGroup,
                expandedGroups,
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
