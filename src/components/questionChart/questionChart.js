import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js";

// in case the correct answer is the 1st
Chart.plugins.register({
  beforeDraw: function(c) {
    var legends = c.legend.legendItems;
    legends.forEach(function(e) {
      if (e.text === "# of wrong Votes") e.fillStyle = "rgb(255, 99, 132)";
    });
  }
});

const QuestionChart = ({ question }) => {
  const [state, setState] = useState({
    labels: [question.answer_1, question.answer_2, question.answer_3],
    datasets: [
      {
        label: "# of Correct votes",
        backgroundColor: ["rgb(34,139,34)"],
        borderColor: [],
        borderWidth: 1
      },
      {
        label: "# of wrong Votes",
        data: [19, 15, 10],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 99, 132)",
          "rgb(255, 99, 132)"
        ],
        borderColor: [],
        borderWidth: 1
      }
    ]
  });

  let withGreen = state;
  withGreen.datasets[1].backgroundColor[question.correctAnswer - 1] =
    "rgb(34,139,34)";
  return (
    <Bar
      data={withGreen}
      options={{
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
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
                display: false
              }
            }
          ]
        },
        title: {
          display: true,
          text: "Students votes",
          fontSize: 20
        },
        legend: {
          display: true,
          position: "right"
        }
      }}
    />
  );
};

export default QuestionChart;
