import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';


export default function Dashboard() {
    return (
        <>
            <div className="dashboard">
                {/* <div className="top"> */}
                <h1>Dashboard</h1>
                <p>Welcome Back Admin!</p>
                {/* </div> */}
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
                        <div className="card">
                            <h1>Top Selling Product</h1>
                            <h2>Meliora DishWasher</h2>
                        </div>
                    </div>
                    <div className="stats">
                        <div className="card-one">
                            <LineChart
                                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                series={[
                                    {
                                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                                    },
                                ]}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className="card-two">
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                                width={400}
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