import { FiWifi, FiLink } from "react-icons/fi";
import { Avatar, Dropdown, Navbar, ToggleSwitch } from "flowbite-react";
import React, { useState, useEffect } from 'react';

export default function MyNavBar() {
    const [wifiSpeed, setWifiSpeed] = useState(0);
    const [cableSpeed, setCableSpeed] = useState(0);

    useEffect(() => {
        const simulateSpeed = () => {
            const wifiSpeed = Math.floor(Math.random() * 100);
            setWifiSpeed(wifiSpeed);

            const cableSpeed = Math.floor(Math.random() * 100);
            setCableSpeed(cableSpeed);
        };

        const interval = setInterval(simulateSpeed, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Navbar fluid className="w-full shadow-md h-[74px] py-5 items-center absolute z-50"
        >
            <Navbar.Brand href="https://flowbite-react.com">
                <div className="flex items-center">
                    <FiWifi className="mr-2 text-blue-400" />
                    <span className="self-center whitespace-nowrap text-sm dark:text-white">{wifiSpeed} Mbits/s (WiFi)</span>
                </div>
                <div className="flex items-center">
                    <FiLink className="mr-2 text-green-400" />
                    <span className="self-center whitespace-nowrap text-sm dark:text-white">{cableSpeed} Mbits/s (Câble)</span>
                </div>
            </Navbar.Brand>
            <div className="flex md:order-2">
            
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
        </Navbar>
    );
}
