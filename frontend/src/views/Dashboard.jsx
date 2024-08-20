import React, { useState, useEffect } from "react";
import BreadCumb from "../components/BreadCumb";
import Chart from "react-apexcharts";
import { FaUserFriends, FaUser, FaUserPlus } from "react-icons/fa";

function Dashboard() {
  const [averageSessionDuration, setAverageSessionDuration] = useState(0);
  const [wifiBandwidth, setWifiBandwidth] = useState([]);
  const [cableBandwidth, setCableBandwidth] = useState([]);
  const [totalConnections, setTotalConnections] = useState(0);
  const [localPostsUsed, setLocalPostsUsed] = useState(0);
  const [guestPosts, setGuestPosts] = useState(0);
  const [hourlyConnections, setHourlyConnections] = useState([]);
  const [dailyConnections, setDailyConnections] = useState([]);
  const [weeklyConnections, setWeeklyConnections] = useState([]);

  useEffect(() => {
    const simulateBandwidth = () => {
      setTotalConnections(Math.floor(Math.random() * 100));
      setLocalPostsUsed(Math.floor(Math.random() * 12));
      setGuestPosts(Math.floor(Math.random() * 10));
    };

    const interval = setInterval(simulateBandwidth, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hourlyData = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 50)
    );
    setHourlyConnections(hourlyData);
    const dailyData = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 200)
    );
    const weeklyData = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 1000)
    );
    const sessionDurationData = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 60)
    );

    setDailyConnections(dailyData);
    setWeeklyConnections(weeklyData);
    setAverageSessionDuration(sessionDurationData);
  }, []);

  const hourlyChartOptions = {
    chart: {
      id: "hourly-connections-chart",
    },
    xaxis: {
      categories: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    },
    colors: ["#4183bb"],
  };

  const pieChartOptions = {
    labels: ["Hourly", "Daily", "Weekly", "Session Duration"],
    colors: ["#4183bb", "#ef4444", "#10b981", "#7c3aed"],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
    },
  };

  return (
    <div>
      <BreadCumb subtitle={"Dashboard"} root={"Dashboard"} title={""} />
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between space-x-4 text-xl dark:text-[#d8d7d7]">
            <div className="w-1/3 shadow-md bg-white rounded-lg p-4 text-gray-900">
              <div className="text-xl dark:text-[#d8d7d7] font-semibold mb-2 text-gray-900 flex items-center justify-between">
                <span className="font-thin"> Actives </span>
                <FaUserFriends className="mr-2" color="#4183bb" />
              </div>
              <p className="text-3xl font-bold dark:text-[#d8d7d7]">
                {totalConnections}
              </p>
            </div>
            <div className="w-1/3 dark:rounded-lg rounded-lg p-4 shadow-md bg-white text-gray-900">
              <div className="text-xl dark:text-[#d8d7d7] font-semibold mb-2 text-gray-900 flex items-center justify-between">
                <span className="font-thin"> Locaux </span>
                <FaUser className="mr-2" color="#4183bb" />
              </div>
              <p className="text-3xl font-bold dark:text-[#d8d7d7]">
                {localPostsUsed}/12
              </p>
            </div>
            <div className="w-1/3 dark:rounded-lg rounded-lg p-4 shadow-md bg-white text-gray-900">
              <div className="text-xl dark:text-[#d8d7d7] font-semibold mb-2 text-gray-900 flex items-center justify-between">
                <span className="font-thin">Invités</span>
                <FaUserPlus className="mr-2" color="#4183bb" />
              </div>
              <p className="text-3xl font-bold dark:text-[#d8d7d7]">
                {guestPosts}
              </p>
            </div>
          </div>
          <div className="bg-white h-auto dark:shadow-md-none dark:bg-[#1d1d1d] shadow-md rounded-lg p-4 shadow-md-gray-200">
            <Chart
              options={hourlyChartOptions}
              series={[{ name: "Connexions", data: hourlyConnections }]}
              type="bar"
              width="100%"
            />
          </div>
        </div>
        <div className="bg-white dark:shadow-md-none dark:bg-[#1d1d1d] shadow-md rounded-lg p-4 shadow-md-gray-200">
          <Chart
            options={pieChartOptions}
            series={[2, 3, 1, 2, 1]}
            type="pie"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
