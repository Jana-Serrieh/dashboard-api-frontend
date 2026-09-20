import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function PostChart({ users }) {
    const names = users.map(user => user.name);
    const postCounts = users.map(user => user.postCount);

    const data = {
        labels: names,
        datasets: [
            {
                label: "Number of Posts",
                data: postCounts,
                backgroundColor: "#c7d2fe",
                borderColor: "#a5b4fc",
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    return (
        <div className="chart-container">
            <Bar data={data} options={options} />
        </div>
    );
}

export default PostChart;