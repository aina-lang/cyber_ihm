import "./App.css";
import Sidebar from "./components/Sidebar/components/Sidebar";
import SidebarItem from "./components/Sidebar/components/SidebarItem";
import SidebarGroupItem from "./components/Sidebar/components/SidebarGroupItem";
import SidebarLogo from "./components/Sidebar/components/SidebarLogo";
import MyNav from "./components/MyNav";

function App() {
  return (
    <div className="h-screen overfow-y-hidden flex w-full bg-gray-100">
      <Sidebar>
        <SidebarLogo
          titleClassName="font-bold text-2xl text-white "
          titleSpanClassName={"text-orange-500"}
          titlePartOne={"Cyber"}
          titlePartTwo={"Capmada"}
        />
        <div className="p-4">
          <SidebarItem title={"Dashbaord"} />
          <SidebarItem title={"Dashbaord1"} />

          <SidebarItem title={"Dashbaord4"} />
          <SidebarGroupItem title="Postes">
            <SidebarItem to={"/"} title="Réseau sans fil" />
            <SidebarItem to={"/"} title="Câble Ethernet" />
          </SidebarGroupItem>
        </div>
      </Sidebar>

      <div className="w-full relative">
        <MyNav />

        <main className="h-screen overflow-y-auto p-10 pt-24">
          
        </main>
      </div>
    </div>
  );
}

export default App;
