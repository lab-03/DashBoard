import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
// import Chart from "chart.js";

// in case the correct answer is the 1st
// Chart.plugins.register({
//   beforeDraw: function(c) {
//     var legends = c.legend.legendItems;
//     legends.forEach(function(e) {
//       if (e.text === "# of wrong Votes") e.fillStyle = "rgb(255, 99, 132)";
//     });
//   }
// });

const StatChart = ({ chartData, colors, type }) => {
  const [state] = useState({
    barChart: {
      labels: chartData.labels,
      datasets: [
        {
          label: chartData.dataSetLabel,
          data: chartData.data,
          backgroundColor: colors,
          borderWidth: 1
        }
      ]
    },
    lineChart: {
      labels: chartData.labels,
      datasets: [
        {
          label: chartData.dataSetLabel,
          data: chartData.data,
          fill: false,
          lineTension: 0.5,
          backgroundColor: colors[0],
          borderColor: colors[0],
          borderWidth: 2
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: 50
            },
            gridLines: {
              display: true
            }
          }
        ]
      },
      title: {
        display: true,
        text: chartData.title,
        fontSize: 20
      },
      legend: {
        display: true,
        position: "right"
      }
    }
  });

  let { barChart, lineChart, options } = state;
  options.title.text = chartData.title;

  if (type === "bar") {
    barChart.labels = chartData.labels;
    barChart.datasets[0].label = chartData.dataSetLabel;
    barChart.datasets[0].data = chartData.data;
    return <Bar data={barChart} options={options} />;
  } else {
    lineChart.labels = chartData.labels;
    lineChart.datasets[0].label = chartData.dataSetLabel;
    lineChart.datasets[0].data = chartData.data;
    return <Line data={lineChart} options={options} />;
  }
};

export default StatChart;
