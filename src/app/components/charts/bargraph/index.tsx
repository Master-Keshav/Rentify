import React from 'react';
import Chart from 'react-apexcharts';

interface BargraphProps {
    lastMonthData: number[];
    currentMonthData: number[];
    categories: String[];
}

const Bargraph: React.FC<BargraphProps> = (props) => {
    const { lastMonthData, currentMonthData, categories } = props
    const options = {
        chart: {
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: categories,
        },
        yaxis: {
            title: {
                text: '$ (thousands)',
            },
        },
        grid: {
            show: false,
        },
        stroke: {
            colors: ["transparent"],
            width: 4,
        },
        fill: {
            opacity: 1,
        },
        dataLabels: { enabled: false },
        colors: ['#00b4d8', '#023e8a'],
        legend: {
            position: "top" as const,
            horizontalAlign: "right" as const,
        },
        tooltip: {
            y: {
                formatter(val: number) {
                    return `$ ${val} thousands`;
                },
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                columnWidth: "55%",
            },
        },
    };

    const series = [
        {
            name: 'Last Month',
            data: lastMonthData,
        },
        {
            name: 'Current Month',
            data: currentMonthData,
        },
    ];

    return (
        <Chart
            options={options}
            series={series}
            type="bar"
            height={280}
            width={850}
        />
    );
};

export default Bargraph;