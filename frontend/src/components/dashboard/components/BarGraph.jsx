import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export default function BarGraph() {
  const [barStats, setBarStats] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const barStats = await axios.get("/order/bar");
        setBarStats(barStats.data.salesData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <BarChart
      dataset={barStats}
      yAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        {
          dataKey: "value",
          label: `Orders of ${barStats.name}`,
          valueFormatter: (val) => `${val} orders`,
        },
      ]}
      layout="horizontal"
      width={500}
      height={400}
    />
  );
}
