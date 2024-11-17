import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart } from "@mui/x-charts/LineChart";

axios.defaults.baseURL = "http://localhost:3001";

export default function LineGraph() {
  const [orderStats, setOrderStats] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const lineStats = await axios.get("/order/line");
        setOrderStats(lineStats.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const graphData = orderStats?.data || [];
  const chartData = graphData.length > 0 
    ? graphData.map((value, index) => ({
        x: index + 1, 
        y: value, 
      }))
    : []; 

  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]} 
      series={[
        {
          data: chartData, 
        },
      ]}
      width={500}
      height={300}
    />
  );
}
