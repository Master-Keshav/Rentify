'use client'

import { useEffect } from 'react';

import Bargraph from '@/app/components/charts/bargraph';
import Donut from '@/app/components/charts/donut'
import Line from '@/app/components/charts/line'
import Navbar from '@/app/components/navbar/navbar';

import "./page.scss"

const Dashboard = () => {

    useEffect(() => {

    }, []);

    const donutChartProps = [
        {
            labels: ["Sale", "Others"],
            series: [684, 1000 - 684]
        },
        {
            labels: ["Rent", "Others"],
            series: [550, 1000 - 550]
        },
        {
            labels: ["Customers", "Others"],
            series: [5684, 10000 - 5684]
        },
        {
            labels: ["Cities", "Others"],
            series: [555, 1000 - 555]
        }
    ]

    const barChartProps = {
        lastMonthData: [1000, 1500, 800, 1200, 2000, 2500, 1800],
        currentMonthData: [1200, 1800, 900, 1100, 2200, 3000, 2500],
        categories: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
    }

    const progressBars = [
        { bgcolor: 'orange', progress: '30', name: "Social Media" },
        { bgcolor: 'red', progress: '60', name: "Marketplace" },
        { bgcolor: '#99ff66', progress: '50', name: "Websites" },
        { bgcolor: '#ff00ff', progress: '85', name: "Digital Ads" },
        { bgcolor: '#99ccff', progress: '95', name: "Others" },
    ];

    return (
        <>
            <div className="container">
                <Navbar />
                <div className="charts">
                    <div className="single-charts">
                        {donutChartProps.map((chart, index) => (
                            <div key={index} className={`${chart.labels[0].toLowerCase()} card`}>
                                <div>
                                    <div className="card-title">
                                        Properties for {chart.labels[0]}
                                    </div>
                                    <div className="card-details">{chart.series[0]}</div>
                                </div>
                                <div className="card-chart">
                                    <Donut labels={chart.labels} series={chart.series} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="multiple-charts">
                        <div className="revenue card">
                            <div className="card-title">
                                Total Revenue
                            </div>
                            <div className="card-details">
                                <div className="amount">
                                    $236,535
                                </div>
                            </div>
                            <div className="card-chart">
                                <Bargraph
                                    lastMonthData={barChartProps.lastMonthData}
                                    currentMonthData={barChartProps.currentMonthData}
                                    categories={barChartProps.categories}
                                />
                            </div>
                        </div>
                        <div className="referral card">
                            <div className="card-title">
                                Property Referrals
                            </div>
                            <div className="card-chart">
                                <Line bars={progressBars} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Dashboard