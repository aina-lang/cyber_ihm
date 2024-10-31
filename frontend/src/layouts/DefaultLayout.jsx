import Sidebar from "../components/Sidebar/components/Sidebar";
import SidebarItem from "../components/Sidebar/components/SidebarItem";
import SidebarLogo from "../components/Sidebar/components/SidebarLogo";
import MyNav from "../components/MyNav";
import { Outlet } from "react-router-dom";
import { HiChartPie, HiLink } from "react-icons/hi";
import { useEffect, useState } from "react";

export default function DefaultLayout() {
  const [gatewayInfo, setGatewayInfo] = useState({ ip: "", mac: "" });
  const [isExpanded, setIsExpanded] = useState(true); // État pour contrôler l'expansion

  useEffect(() => {
    fetchGatewayInfo();
  }, []);

  const fetchGatewayInfo = () => {
    // Simulation de données pour la passerelle
    const dummyGatewayInfo = {
      ip: "192.168.1.1",
      mac: "12:34:56:78:9A:BC",
    };
    setGatewayInfo(dummyGatewayInfo);
  };

  const toggleExpansion = () => {
    setIsExpanded(prevState => !prevState); // Bascule l'état d'expansion
  };

  return (
    <div className="h-screen overflow-y-hidden flex w-full bg-[#e4edf4] dark:bg-[#121212]">
      <Sidebar className="relative overflow-hidden">
        <SidebarLogo
          titleClassName="font-bold text-2xl dark:text-[#d8d7d7] text-gray-600"
          titleSpanClassName="text-[#4183bb]"
          titlePartOne="Cyber "
          titlePartTwo="Diamond"
        />
        <div className="p-4">
          <SidebarItem title="Tableau de bord" icon={<HiChartPie />} />
          <SidebarItem to="/active" title="Postes " icon={<HiLink />} />
        </div>


        {/* Section des informations de la passerelle */}
        {/* {isExpanded && (
          <div className="flex min-h-[250px] justify-end flex-col p-3 space-y-2 absolute bottom-0">
            <div className="dark:text-[#d8d7d7] rounded-lg p-4 py-0">
              <h2 className="font-semibold mb-2 text-gray-700 dark:text-[#d8d7d7]">Passerelle</h2>
              <p className="text-sm text-gray-700 dark:text-[#d8d7d7]">{gatewayInfo.ip}</p>
            </div>
            <div className="dark:text-[#d8d7d7] rounded-lg p-4 py-0">
              <h2 className="font-semibold mb-2 text-gray-700 dark:text-[#d8d7d7]">Mac du routeur</h2>
              <p className="text-sm text-gray-700 dark:text-[#d8d7d7]">{gatewayInfo.mac}</p>
            </div>
          </div>
        )} */}
      </Sidebar>

      <div className="w-full relative">
        <MyNav />

        <main className="h-screen overflow-y-auto p-10 pt-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
