import Sidebar from "../components/Sidebar/components/Sidebar";
import SidebarItem from "../components/Sidebar/components/SidebarItem";
import SidebarGroupItem from "../components/Sidebar/components/SidebarGroupItem";
import SidebarLogo from "../components/Sidebar/components/SidebarLogo";
import MyNav from "../components/MyNav";
import { Outlet } from "react-router-dom";
import { HiWifi, HiChartPie, HiUsers, HiLink } from "react-icons/hi";
export default function DefaultLayout() {
  return (
    <div className="h-screen overfow-y-hidden flex w-full bg-gray-100 dark:bg-gray-900">
      <Sidebar>
        <SidebarLogo
          titleClassName="font-bold text-2xl text-white "
          titleSpanClassName={"text-orange-500"}
          titlePartOne={"Cyber"}
          titlePartTwo={" unknow"}
        />
        <div className="p-4">
          <SidebarItem title={"Dashboard"} icon={<HiChartPie />} />

          <SidebarGroupItem title="Postes" icon={<HiUsers />}>
            <SidebarItem
              to={"/wifi"}
              title="Réseau sans fil"
              icon={<HiWifi />}
            />
            <SidebarItem
              to={"/cable"}
              title="Câble Ethernet"
              icon={<HiLink />}
            />
          </SidebarGroupItem>
          <SidebarItem to={"/profil"} title="Profil" icon={<HiLink />} />
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
