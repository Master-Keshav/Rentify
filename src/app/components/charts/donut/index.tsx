import React from 'react';
import Chart from 'react-apexcharts';

interface DonutProps {
    labels: String[],
    series: number[]
}

const Donut: React.FC<DonutProps> = (props: any) => {
    const { labels, series } = props

    const options = {
        colors: ['#023e8a', '#00b4d8'],
        legend: { show: false },
        dataLabels: { enabled: false },
        labels: labels,
    };

    return (
        <div className="donut">
            <Chart options={options} series={series} type="donut" width="150" />
        </div>
    );
};

export default Donut;