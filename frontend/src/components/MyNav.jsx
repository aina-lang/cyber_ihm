import { FiWifi } from "react-icons/fi";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import axios from "axios";

export default function MyNavBar() {
  const [wifiSpeed, setWifiSpeed] = useState(0);
  const [gatewayInfo, setGatewayInfo] = useState({ ip: "", mac: "" });
  const [darkTheme, setDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Mettre à jour le thème dans le localStorage et appliquer
  useEffect(() => {
    localStorage.setItem("theme", darkTheme ? "dark" : "light");
    document.body.classList.toggle("dark", darkTheme);
  }, [darkTheme]);

  // Changer le thème
  const handleChange = () => {
    setDarkTheme(!darkTheme);
  };

  // Simulez la vitesse de connexion
  
  const checkSpeed = async () => {
    const imageUrl = "https://via.placeholder.com/1000"; // Larger image
    const corsProxy = "https://cors-anywhere.herokuapp.com/"; // CORS proxy
    const startTime = new Date().getTime();
    
    try {
      const response = await fetch(corsProxy + imageUrl, { cache: "no-cache" });
      if (!response.ok) throw new Error("Network response was not ok");
  
      const endTime = new Date().getTime();
      
      const duration = (endTime - startTime) / 1000; // Time in seconds
      const fileSizeInBits = 1000 * 1000 * 8; // Size of the image in bits (1000x1000)
      const speedMbps = (fileSizeInBits / duration / (1024 * 1024)).toFixed(2); // Convert to Mbps
      
      setWifiSpeed(speedMbps);
    } catch (error) {
      console.error("Erreur de mesure de la vitesse réseau:", error);
      setWifiSpeed("Erreur lors de la mesure de la vitesse.");
    }
  };

  useEffect(() => {
    checkSpeed(); // Initial check
    const interval = setInterval(checkSpeed, 5000); // Check every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);


  // Récupérer les informations de la passerelle depuis l'API
  useEffect(() => {
    const fetchGatewayInfo = async () => {
      try {
        // const response = await axios.get('http://localhost:8000/api/network-info'); // Remplacez par votre URL d'API
        // console.log(response.data); // Axios renvoie les données dans response.data
        // setGatewayInfo(response.data); // Mettez à jour l'état avec les données récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de la passerelle :", error);
      }
    };
  
    fetchGatewayInfo(); // N'oubliez pas d'appeler la fonction
  }, []);
  return (
    <Navbar
      fluid
      className="w-[98%] rounded-md mx-2 top-2 h-[72px] py-4 items-center absolute z-40 dark:bg-[#1d1d1d] bg-white shadow-sm"
    >
      <Navbar.Brand href="#" className="space-x-5 cursor-default">
        <div className="flex items-center">
          <FiWifi className="mr-2 dark:text-[#d8d7d7]" />
          <span className="self-center whitespace-nowrap text-sm dark:text-[#d8d7d7]">
            {wifiSpeed} Mbits/s
          </span>
        </div>
      </Navbar.Brand>
      
      <div className="flex md:order-2 items-center space-x-4">
        {/* Affichage des informations de la passerelle */}
        <div className="flex items-center space-x-4">
          <span className="text-sm dark:text-white">{gatewayInfo.ip}</span>
          <span className="text-sm dark:text-white">{gatewayInfo.mac}</span>
        </div>
        
        <Switch
          checkedChildren="Sombre"
          unCheckedChildren="Clair"
          checked={darkTheme}
          onChange={handleChange}
        />
        
        <Dropdown
          className="shadow-md border-none mr-3"
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="Paramètres utilisateur"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Mercia</span>
            <span className="block truncate text-sm font-medium">
            Mercia@gmail.com
            </span>
          </Dropdown.Header>
          {/* <Dropdown.Item>Tableau de bord</Dropdown.Item> */}
          <Dropdown.Item>Paramètres</Dropdown.Item>
          <Dropdown.Item>Gains</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Se déconnecter</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
