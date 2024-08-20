import { FiWifi, FiLink } from "react-icons/fi";
import { Avatar, Dropdown, Navbar, ToggleSwitch } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Switch } from "antd";

export default function MyNavBar() {
  const [wifiSpeed, setWifiSpeed] = useState(0);
  const [cableSpeed, setCableSpeed] = useState(0);

  const [darkTheme, setDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    // Set the theme preference in localStorage
    localStorage.setItem("theme", darkTheme ? "dark" : "light");

    // Apply or remove the 'dark' class from the body accordingly
    if (darkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkTheme]);

  const handleChange = () => {
    setDarkTheme(!darkTheme);
  };

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
    <Navbar
      fluid
      className="w-[98%] rounded-md mx-2 top-2 h-[72px] py-4 items-center absolute z-40 dark:bg-[#1d1d1d] bg-white shadow-sm "
    >
      <Navbar.Brand href="https://flowbite-react.com" className="space-x-5 cursor-default">
     
        <div className="flex items-center ">
          <FiWifi className="mr-2 dark:text-[#d8d7d7]" />
          <span className="self-center whitespace-nowrap text-sm dark:text-[#d8d7d7]">
            {wifiSpeed} Mbits/s <span className="text-[#4183bb]"> (WiFi)</span> 
          </span>
        </div>
        {/* <div className="flex items-center">
          <FiLink className="mr-2 text-green-400" />
          <span className="self-center whitespace-nowrap text-sm dark:text-white">
            {cableSpeed} Mbits/s (Câble)
          </span>
        </div> */}
      </Navbar.Brand>
      <div className="flex md:order-2 items-center space-x-4">
        {/* <div className="flex items-center space-x-4">
          <span className="text-sm dark:text-white">{gatewayInfo.ip}</span>
          <span className="text-sm dark:text-white">{gatewayInfo.mac}</span>
        </div> */}
        <Switch
          checkedChildren="Dark"
          unCheckedChildren="Light"
          checked={darkTheme}
        //  className="bg-red-500"
          onChange={handleChange}
        />
        <Dropdown
        className="shadow-md border-none mr-3"
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
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
