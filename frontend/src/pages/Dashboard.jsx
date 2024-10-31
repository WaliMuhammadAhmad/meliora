import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";

axios.defaults.baseURL = "http://localhost:3001";

export default function Dashboard() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [topSellingProduct, setTopSellingProduct] = useState({
    name: "",
    percentage: 0,
  });
  const [orderStats, setOrderStats] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total orders
        const ordersResponse = await axios.get("/order/");
        setTotalOrders(ordersResponse.data.length);

        // Fetch total products
        const productsResponse = await axios.get("/products/");
        setTotalProducts(productsResponse.data.length);

        // Fetch total revenue
        const revenueResponse = await axios.get("/order/revenue");
        setTotalRevenue(revenueResponse.data.totalRevenue);

        // Fetch top-selling product
        const topProductResponse = await axios.get("/order/top-selling");
        const topProduct = topProductResponse.data;
        setTopSellingProduct({
          name: topProduct.name,
          percentage: topProduct.percentage,
        });

        // Fetch order statistics for LineChart
        // const statsResponse = await axios.get("/orders/stats");
        // setOrderStats(statsResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const circleRadius = 45;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progress = (topSellingProduct.percentage / 100) * circleCircumference;

  return (
    <div className="dashboard">
      <div className="top">
        <div className="left">
          <h1>Dashboard</h1>
          <p>Welcome Back Admin!</p>
        </div>
      </div>
      <div className="main-dashboard">
        <div className="cards">
          <div className="card">
            <h1>{totalOrders}</h1>
            <h2>Total Orders</h2>
          </div>
          <div className="card">
            <h1>{totalProducts}</h1>
            <h2>Total Products</h2>
          </div>
          <div className="card">
            <h1>${totalRevenue.toFixed(2)}</h1>
            <h2>Total Revenue</h2>
          </div>
          <div className="card last-card">
            <div className="first">
              <h2>Top Selling Product</h2>
              <h1>{topSellingProduct.name}</h1>
            </div>
            <div className="progress-container">
              <svg width="120" height="120" className="circular-chart">
                <circle
                  className="circle-background"
                  cx="60"
                  cy="60"
                  r="45"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  className="circle-progress"
                  cx="60"
                  cy="60"
                  r="45"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={circleCircumference - progress}
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  className="progress-text"
                >
                  {topSellingProduct.percentage}%
                </text>
              </svg>
              <div className="label">Total Order</div>
            </div>
          </div>
        </div>
        <div className="stats">
          <div className="card-one">
            <LineChart
              xAxis={[{ data: orderStats.map((stat) => stat.month) }]}
              series={[
                { data: orderStats.map((stat) => stat.value), area: true },
              ]}
              width={500}
              height={400}
            />
          </div>
          <div className="card-two">
            <BarChart
              dataset={orderStats.map((stat) => ({
                month: stat.month,
                value: stat.value,
              }))}
              yAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[
                {
                  dataKey: "value",
                  label: "Monthly Orders",
                  valueFormatter: (val) => `${val} orders`,
                },
              ]}
              layout="horizontal"
              width={500}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
