import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const QuestionChart = ({ question }) => {
  const [state, setState] = useState({
    labels: [question.answer_1, question.answer_2, question.answer_3],
    datasets: [
      {
        label: "# of Votes",
        data: [19, 15, 10],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 99, 132)",
          "rgba(255, 99, 132)"
        ],
        borderColor: [],
        borderWidth: 1
      }
    ]
  });

  let withGreen = state;
  let correctAnswerNumber = question.correctAnswer.split("#")[1]; // answer#1
  console.log({ question, correctAnswerNumber });
  withGreen.datasets[0].backgroundColor[correctAnswerNumber - 1] =
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
