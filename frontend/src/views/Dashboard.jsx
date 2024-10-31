import React, { useState, useEffect } from "react";
import BreadCumb from "../components/BreadCumb";
import Chart from "react-apexcharts";
import { FaUserFriends, FaUser, FaUserPlus } from "react-icons/fa";
import axios from "axios"; // Assurez-vous d'avoir installé axios

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalClients: 0,
    blockedClients: 0,
    activeSessions: 0,
    totalElapsedTime: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/dashboard'); // Ajustez le chemin en fonction de votre API
        setDashboardData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du tableau de bord', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-4">
      <BreadCumb subtitle={"Tableau de bord"} root={"Tableau de bord"} title={""} />
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="justify-between grid grid-cols-2 gap-4 text-xl">
            <div className="shadow-md bg-white rounded-lg p-4 text-gray-900 dark:bg-[#1d1d1d] dark:text-[#d8d7d7]">
              <div className="text-xl font-semibold mb-2 flex items-center justify-between">
                <span className="font-thin"> Actives </span>
                <FaUserFriends className="mr-2" color="#4183bb" />
              </div>
              <p className="text-3xl font-bold dark:text-[#d8d7d7]">
                {dashboardData.activeSessions}
              </p>
            </div>
            <div className="dark:rounded-lg rounded-lg p-4 shadow-md bg-white text-gray-900 dark:bg-[#1d1d1d] dark:text-[#d8d7d7]">
              <div className="text-xl font-semibold mb-2 flex items-center justify-between">
                <span className="font-thin"> Arrêtés </span>
                <FaUser className="mr-2" color="#4183bb" />
              </div>
              <p className="text-3xl font-bold dark:text-[#d8d7d7]">
                {dashboardData.blockedClients}
              </p>
            </div>
            <div className="dark:rounded-lg rounded-lg p-4 shadow-md bg-white text-gray-900 dark:bg-[#1d1d1d] dark:text-[#d8d7d7]">
              <div className="text-xl font-semibold mb-2 flex items-center justify-between">
                <span className="font-thin">Total Clients</span>
                <FaUserPlus className="mr-2" color="#4183bb" />
              </div>
              <p className="text-3xl font-bold dark:text-[#d8d7d7]">
                {dashboardData.totalClients}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white h-auto dark:shadow-md-none dark:bg-[#1d1d1d] shadow-md rounded-lg p-4">
          <Chart
            options={{
              chart: { id: "total-time-chart" },
              xaxis: { categories: ["Temps Utilisé"] },
              colors: ["#4183bb"],
              theme: {
                mode: 'light', // 'dark' ou 'light'
              },
            }}
            series={[{ name: "Temps Utilisé", data: [dashboardData.totalElapsedTime] }]}
            type="bar"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

