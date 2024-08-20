import Sidebar from "../components/Sidebar/components/Sidebar";
import SidebarItem from "../components/Sidebar/components/SidebarItem";
import SidebarGroupItem from "../components/Sidebar/components/SidebarGroupItem";
import SidebarLogo from "../components/Sidebar/components/SidebarLogo";
import MyNav from "../components/MyNav";
import { Outlet } from "react-router-dom";
import { HiWifi, HiChartPie, HiUsers, HiLink } from "react-icons/hi";
import { useEffect, useState } from "react";
import AddClientModal from "../components/AddClientModal";

export default function DefaultLayout() {
  const [gatewayInfo, setGatewayInfo] = useState({ ip: "", mac: "" });
  useEffect(() => {
    fetchGatewayInfo();
  }, []);

  const fetchGatewayInfo = () => {
    const dummyGatewayInfo = {
      ip: "192.168.1.1",
      mac: "12:34:56:78:9A:BC",
    };
    setGatewayInfo(dummyGatewayInfo);
  };

  return (
    <div className="h-screen overfow-y-hidden flex w-full bg-[#e4edf4] dark:bg-[#121212]">
      <Sidebar className="relative">
        <SidebarLogo
          titleClassName="font-bold text-2xl dark:text-[#d8d7d7] text-gray-600"
          titleSpanClassName={"text-[#4183bb]"}
          titlePartOne={"Cyber "}
          titlePartTwo={"Diamond"}
        />
        <div className="p-4">
          <SidebarItem title={"Dashboard"} icon={<HiChartPie />} />

          <SidebarGroupItem title="Postes" icon={<HiUsers />}>
           
            <SidebarItem
              to={"/active"}
              title="Postes actifs"
              icon={<HiLink />}
            />
            <SidebarItem
              to={"/local"}
              title="Postes locaux"
              icon={<HiLink />}
            />
            <SidebarItem
              to={"/guest"}
              title="Postes invitées"
              icon={<HiLink />}
            />
          </SidebarGroupItem>
          <SidebarItem to={"/profil"} title="Profil" icon={<HiLink />} />
        </div>

        <div className=" flex min-h-[250px] justify-end flex-col p-3 space-y-2 absolute bottom-0">
          <div className=" dark:text-[#d8d7d7] rounded-lg p-4 py-0">
            <h2 className=" font-semibold mb-2 text-gray-700 dark:text-[#d8d7d7]">Passerelle</h2>
            <p className="text-sm text-gray-700 dark:text-[#d8d7d7]">{gatewayInfo.ip}</p>
          </div>
          <div className="dark:text-[#d8d7d7]  rounded-lg p-4 py-0">
            <h2 className=" font-semibold mb-2 text-gray-700 dark:text-[#d8d7d7]">Mac du routeur</h2>
            <p className="text-sm text-gray-700 dark:text-[#d8d7d7]">{gatewayInfo.mac}</p>
          </div>
        </div>
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
