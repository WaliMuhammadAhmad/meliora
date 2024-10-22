import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';



export default function Dashboard() {
    const valueFormatter = (value) => `${value} mm`;
    const dataset = [
        { month: 'Jan', seoul: 20 },
        { month: 'Feb', seoul: 25 },
        { month: 'Mar', seoul: 30 },
        { month: 'Apr', seoul: 50 },
        { month: 'May', seoul: 60 },
        { month: 'June', seoul: 80 },
        { month: 'July', seoul: 120 },
        { month: 'Aug', seoul: 140 },
        { month: 'Sept', seoul: 100 },
        { month: 'Oct', seoul: 70 },
        { month: 'Nov', seoul: 40 },
        { month: 'Dec', seoul: 30 },
    ];
    const chartSetting = {
        xAxis: [
            {
                label: 'rainfall (mm)',
            },
        ],
        width: 500,
        height: 400,
    };
    const circleRadius = 45;
    const circleCircumference = 2 * Math.PI * circleRadius;

    const progress = (60 / 100) * circleCircumference;
    return (
        <>
            <div className="dashboard">
                <div className="top">
                    <div className="left">

                        <h1>Dashboard</h1>
                        <p>Welcome Back Admin!</p>
                    </div>
                    {/* <div className="dashboard-filter">
                        <CiCalendar />
                        <h5>Filter Periode</h5>
                    </div> */}
                </div>
                <div className="main-dashboard">
                    <div className="cards">
                        <div className="card">
                            <h1>123</h1>
                            <h2>Total Orders</h2>
                        </div>
                        <div className="card">
                            <h1>9</h1>
                            <h2>Total Products</h2>
                        </div>
                        <div className="card">
                            <h1>432</h1>
                            <h2>Total Revenue</h2>
                        </div>
                        <div className="card last-card">
                            <div className="first">
                                <h2>Top Selling Product</h2>
                                <h1>Meliora <br />DishWasher</h1>
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
                                    <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="progress-text">
                                        60
                                    </text>
                                </svg>
                                <div className="label">Total Order</div>
                            </div>
                        </div>
                    </div>
                    <div className="stats">
                        <div className="card-one">
                            <LineChart
                                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                series={[
                                    {
                                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                                        area: true,
                                    },
                                ]}
                                width={500}
                                height={400}
                            />
                        </div>
                        <div className="card-two">
                            <BarChart
                                dataset={dataset}
                                yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                                series={[{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter }]}
                                layout="horizontal"
                                {...chartSetting}
                                width={500}
                                height={400}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


// Made by: Zain Manzoor github: ZainManzoor2003