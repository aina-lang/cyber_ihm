import React, { useState, useEffect } from "react";
import BreadCumb from "../components/BreadCumb";
import Chart from "react-apexcharts";
import { FaUserFriends, FaUser, FaUserPlus } from "react-icons/fa";

function Dashboard() {
  const [wifiBandwidth, setWifiBandwidth] = useState([]);
  const [cableBandwidth, setCableBandwidth] = useState([]);
  const [totalConnections, setTotalConnections] = useState(0);
  const [localPostsUsed, setLocalPostsUsed] = useState(0);
  const [guestPosts, setGuestPosts] = useState(0);

  useEffect(() => {
    const simulateBandwidth = () => {
      const wifiData = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 100)
      );
      setWifiBandwidth(wifiData);

      const cableData = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 100)
      );
      setCableBandwidth(cableData);

      // Simulate total connections, local posts used, and guest posts
      setTotalConnections(Math.floor(Math.random() * 100));
      setLocalPostsUsed(Math.floor(Math.random() * 12));
      setGuestPosts(Math.floor(Math.random() * 10));
    };

    const interval = setInterval(simulateBandwidth, 5000);
    return () => clearInterval(interval);
  }, []);

  const [hourlyConnections, setHourlyConnections] = useState([]);
  const [dailyConnections, setDailyConnections] = useState([]);
  const [weeklyConnections, setWeeklyConnections] = useState([]);
  const [averageSessionDuration, setAverageSessionDuration] = useState([]);

  useEffect(() => {
    // Simulated data for hourly, daily, and weekly connections
    const hourlyData = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 50)
    );
    setHourlyConnections(hourlyData);

    const dailyData = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 200)
    );
    setDailyConnections(dailyData);

    const weeklyData = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 1000)
    );
    setWeeklyConnections(weeklyData);

    // Simulated data for average session duration
    const sessionDurationData = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 60)
    );
    setAverageSessionDuration(sessionDurationData);
  }, []);

  const hourlyChartOptions = {
    chart: {
      id: "hourly-connections-chart",
    },
    xaxis: {
      categories: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    },
    colors: ["#6875f5"],
  };

  const dailyChartOptions = {
    chart: {
      id: "daily-connections-chart",
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    colors: ["#6875f5"],
    plotOptions: {
      pie: {
        size: "70%",
      },
    },
  };
  const weeklyChartOptions = {
    chart: {
      id: "weekly-connections-chart",
    },
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    },
    colors: ["#6875f5"],
  };

  const sessionDurationChartOptions = {
    chart: {
      id: "session-duration-chart",
    },
    xaxis: {
      categories: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    },
    colors: ["#6875f5"],
  };

  return (
    <div>
      <BreadCumb subtitle={"Dashboard"} root={"Dashboard"} title={""} />
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between space-x-4  text-xl dark:text-[#d8d7d7]">
            <div className="w-1/3  dark: dark:border-none border  bg-[#fcfcfc]  rounded-lg p-4 text-gray-700">
              <div className="text-xl dark:text-[#d8d7d7] font-semibold mb-2 text-gray-700 flex items-center">
                <FaUserFriends className="mr-2" /> Actives
              </div>
              <p className="text-3xl font-bold dark:text-[#d8d7d7]">
                {totalConnections}
              </p>
            </div>
            <div className="w-1/3  dark: rounded-lg p-4 border bg-[#fcfcfc]   text-gray-700">
              <div className="text-xl dark:text-[#d8d7d7] font-semibold mb-2 text-gray-700 flex items-center">
                <FaUser className="mr-2" /> locaux
              </div>
              <p className="text-3xl font-bold dark:text-[#d8d7d7]">
                {localPostsUsed}/12
              </p>
            </div>
            <div className="w-1/3  dark: rounded-lg p-4 border bg-[#fcfcfc]   text-gray-700">
              <div className="text-xl dark:text-[#d8d7d7] font-semibold mb-2 text-gray-700 flex items-center">
                <FaUserPlus className="mr-2" /> invités
              </div>
              <p className="text-3xl font-bold dark:text-[#d8d7d7]">
                {guestPosts}
              </p>
            </div>
          </div>
          <div className="bg-[#fcfcfc] h-auto  dark:border-none dark:bg-[#1d1d1d] border  rounded-lg p-4 border-gray-200">
            <h2 className="text-xl dark:text-[#d8d7d7] font-semibold mb-4">
              Nombre de connexions par heure
            </h2>
            <Chart
              options={hourlyChartOptions}
              series={[{ name: "Connexions", data: hourlyConnections }]}
              type="bar"
              width="100%"
            />
          </div>
        </div>
        <div className="bg-[#fcfcfc]  dark:border-none  dark:bg-[#1d1d1d] border rounded-lg p-4 border-gray-200">
          <h2 className="text-xl dark:text-[#d8d7d7] font-semibold mb-4">
            Nombre de connexions par jour
          </h2>
          <Chart
            options={dailyChartOptions}
            series={[{ name: "Connexions", data: dailyConnections }]}
            type="heatmap"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
