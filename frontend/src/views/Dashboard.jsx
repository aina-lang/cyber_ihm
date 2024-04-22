import React, { useState, useEffect } from "react";
import BreadCumb from "../components/BreadCumb";
import Chart from "react-apexcharts";

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
  };

  const dailyChartOptions = {
    chart: {
      id: "daily-connections-chart",
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
  };

  const weeklyChartOptions = {
    chart: {
      id: "weekly-connections-chart",
    },
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    },
  };

  const sessionDurationChartOptions = {
    chart: {
      id: "session-duration-chart",
    },
    xaxis: {
      categories: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    },
  };

  return (
    <div>
      <BreadCumb subtitle={"Dashboard"} root={"Dashboard"} title={""} />
      <div className="flex justify-between space-x-4  text-gray-700">
        <div className="w-1/4 bg-white rounded-lg p-4 shadow-md text-gray-800">
          <div className="text-xl font-semibold mb-2 text-gray-800">
            Postes connectés
          </div>
          <p className="text-3xl font-bold text-gray-700">{totalConnections}</p>
        </div>
        <div className="w-1/4 bg-white rounded-lg p-4 shadow-md text-gray-800">
          <div className="text-xl font-semibold mb-2 text-gray-800">
            Postes locaux utilisés
          </div>
          <p className="text-3xl font-bold text-gray-700">
            {localPostsUsed}/12
          </p>
        </div>
        <div className="w-1/4 bg-white rounded-lg p-4 shadow-md text-gray-800">
          <div className="text-xl font-semibold mb-2 text-gray-800">
            Postes invités
          </div>
          <p className="text-3xl font-bold text-gray-700">{guestPosts}</p>
        </div>
        <div className="w-1/4 bg-white rounded-lg p-4 shadow-md text-gray-800">
          <div className="text-xl font-semibold mb-2 text-gray-800">
            Connexions sur WiFi
          </div>
          <p className="text-3xl font-bold text-gray-700">100</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 my-4">
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Nombre de connexions par heure
          </h2>
          <Chart
            options={hourlyChartOptions}
            series={[{ name: "Connexions", data: hourlyConnections }]}
            type="bar"
            width="100%"
          />
        </div>
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Nombre de connexions par jour
          </h2>
          <Chart
            options={dailyChartOptions}
            series={[{ name: "Connexions", data: dailyConnections }]}
            type="bar"
            width="100%"
          />
        </div>
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Nombre de connexions par semaine
          </h2>
          <Chart
            options={weeklyChartOptions}
            series={[{ name: "Connexions", data: weeklyConnections }]}
            type="bar"
            width="100%"
          />
        </div>
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Durée moyenne des sessions (en minutes)
          </h2>
          <Chart
            options={sessionDurationChartOptions}
            series={[{ name: "Durée moyenne", data: averageSessionDuration }]}
            type="line"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
