import React, { useEffect, useState } from "react";
import LogOut from "../logout/LogOut";
import SessionSelector from "../SessionSelector/SessionSelector";
import StatChart from "../StatChart/StatChart";
import StatNumber from "../StatNumber/StatNumber";
import "./courseStatPage.css";
// import topLeftImage from "./topLeft.png";

const CourseStat = props => {
  let { code, name } = props.match.params;
  const [state, setState] = useState({
    sessions: [
      {
        id: 1,
        number: 1,
        created_at: "NR-NR-NRTNR:NR:NR.NRZ",
        attendance: {
          total_students: "NR",
          attended_students: "NR",
          unattended_students: "NR"
        },
        interactive_quizzes: [
          {
            name: "hamada",
            total_students: "NR",
            total_right_answers: "NR",
            total_questions: "NR",
            questions: [
              {
                text: "question #1",
                choices: [
                  { text: "choice 1", correct: true, no_students_choosed: 0 },
                  {
                    text: "choice 2",
                    correct: false,
                    no_students_choosed: 0
                  },
                  { text: "choice 3", correct: false, no_students_choosed: 0 }
                ]
              }
            ],
            ended_at: null,
            started_at: "2020-08-11T12:22:20.113Z"
          }
        ],
        feedback: [
          {
            text: "feedback Question: was this lecture/lab/section helpful?",
            average_rating: 2.5,
            rating_count: { "1": "0", "2": "0", "3": "0", "4": "0" },
            students_submitted: 0
          },
          {
            text:
              "feedback Question: Did you fully understand the topic of this lecture?",
            average_rating: 2.5,
            rating_count: { "1": "0", "2": "0", "3": "0", "4": "0" },
            students_submitted: 0
          }
        ]
      }
    ],
    currentSessionId: 1,
    getSessions: true,
    chartsData: [
      {
        id: "0",
        labels: ["1", "2", "3", "4"],
        dataSetLabel: "# of votes",
        data: [],
        title: "feedback Question: was this lecture/lab/section helpful?",
        chartType: "bar"
      },
      {
        id: "1",
        labels: ["1", "2", "3", "4"],
        dataSetLabel: "# of votes",
        data: [],
        title:
          "feedback Question: Did you fully understand the topic of this lecture?",
        chartType: "bar"
      },
      {
        id: "2",
        labels: [],
        dataSetLabel: "# of students",
        data: [],
        title: "Attendees per session",
        chartType: "line"
      }
    ],
    currentChartId: 0,
    currentChart: {
      id: "0",
      labels: ["1", "2", "3", "4"],
      dataSetLabel: "# of votes",
      data: [],
      title: "feedback Question: was this lecture/lab/section helpful?",
      chartType: "bar"
    },
    stats: [
      {
        id: "1",
        title: "Number of attendees",
        value: ""
      },
      {
        id: "2",
        title: "Number of questions",
        value: ""
      },
      {
        id: "3",
        title: "Number of participants",
        value: ""
      },
      {
        id: "4",
        title: "% of participated students",
        value: ""
      },
      {
        id: "5",
        title: "Number of correct answers",
        value: ""
      },
      {
        id: "6",
        title: "% of correct answers",
        value: ""
      }
    ]
  });
  useEffect(() => {
    let { getSessions } = state;
    if (getSessions) {
      let { stats, chartsData } = state;

      fetch(`https://a-tracker.herokuapp.com/courses/${code}/report`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("accessToken"),
          client: localStorage.getItem("client"),
          uid: localStorage.getItem("uid"),
          "token-type": localStorage.getItem("tokenType"),
          expiry: localStorage.getItem("expiry")
        }
      })
        .then(response => response.json())
        .then(response => {
          let { sessions } = response;
          let session = sessions[0];

          stats[0].value = sessions[0].attendance.attended_students;
          if (sessions[0].interactive_quizzes.length !== 0) {
            stats[1].value = sessions[0].interactive_quizzes[0].total_questions;
            stats[2].value = sessions[0].interactive_quizzes[0].total_students;
            stats[3].value =
              (stats[0].value *
                sessions[0].interactive_quizzes[0].total_students) /
                100 +
              "%";
            stats[4].value =
              sessions[0].interactive_quizzes[0].total_right_answers;
            stats[5].value =
              (sessions[0].interactive_quizzes[0].total_students *
                stats[4].value) /
                100 +
              "%";

            console.log(session);
            // let numberOfQuestions =
            //   session.interactive_quizzes[0].questions.length;
            for (let i = 0; i < session.interactive_quizzes.length; i++) {
              let questionChart = {
                id: chartsData.length.toString().toString(),
                labels: [
                  session.interactive_quizzes[i].questions[0].choices[0].text,
                  session.interactive_quizzes[i].questions[0].choices[1].text,
                  session.interactive_quizzes[i].questions[0].choices[2].text
                ],
                dataSetLabel: "# of votes",
                data: [
                  session.interactive_quizzes[i].questions[0].choices[0]
                    .no_students_choosed,
                  session.interactive_quizzes[i].questions[0].choices[1]
                    .no_students_choosed,
                  session.interactive_quizzes[i].questions[0].choices[2]
                    .no_students_choosed
                ],
                title: session.interactive_quizzes[i].questions[0].text,
                chartType: "bar"
              };
              chartsData.push(questionChart);
            }
          }
          chartsData[2].data = sessions.map(session => {
            return session.attendance.attended_students;
          });

          let count = 1;
          chartsData[2].labels = sessions.map(session => {
            sessions[count - 1].number = count;
            return count++;
          });

          if (session.feedback.length !== 0) {
            for (let i = 0; i < 2; i++) {
              let temp = [
                session.feedback[i].rating_count["1"],
                session.feedback[i].rating_count["2"],
                session.feedback[i].rating_count["3"],
                session.feedback[i].rating_count["4"]
              ];
              chartsData[i].data = temp;
            }
          }
          setState({
            ...state,
            sessions,
            chartsData,
            currentChart: chartsData[0],
            stats,
            currentSessionId: session.id,
            getSessions: false
          });
        })
        .catch(err => console.log(err));
    }
  }, [state, code]);

  const setStats = (sessions, id) => {
    let { stats, chartsData } = state;
    let session = sessions.filter(session => {
      return session.id.toString() === id;
    });
    console.log(id, session[0]);
    stats[0].value = session[0].attendance.attended_students;

    if (sessions[0].interactive_quizzes.length !== 0) {
      stats[1].value = sessions[0].interactive_quizzes[0].total_questions;
      stats[2].value = session[0].interactive_quizzes[0].total_students;
      if (stats[0].value !== "NR")
        stats[3].value =
          (stats[0].value * session[0].interactive_quizzes[0].total_students) /
          100;
      stats[4].value = session[0].interactive_quizzes[0].total_right_answers;
      if (stats[4].value !== "NR")
        stats[5].value =
          (session[0].interactive_quizzes[0].total_students * stats[4].value) /
          100;

      while (chartsData.length > 3) chartsData.pop();
      for (let i = 0; i < session[0].interactive_quizzes.length; i++) {
        let questionChart = {
          id: chartsData.length.toString(),
          labels: [
            session[0].interactive_quizzes[i].questions[0].choices[0].text,
            session[0].interactive_quizzes[i].questions[0].choices[1].text,
            session[0].interactive_quizzes[i].questions[0].choices[2].text
          ],
          dataSetLabel: "# of votes",
          data: [
            session[0].interactive_quizzes[i].questions[0].choices[0]
              .no_students_choosed,
            session[0].interactive_quizzes[i].questions[0].choices[1]
              .no_students_choosed,
            session[0].interactive_quizzes[i].questions[0].choices[2]
              .no_students_choosed
          ],
          title: session[0].interactive_quizzes[i].questions[0].text,
          chartType: "bar"
        };
        chartsData.push(questionChart);
      }
    }
    chartsData[2].data = sessions.map(session => {
      return session.attendance.attended_students;
    });

    let count = 1;
    chartsData[2].labels = sessions.map(session => {
      sessions[count - 1].number = count;
      return count++;
    });
    if (session.feedback.length !== 0) {
      for (let i = 0; i < 2; i++) {
        let temp = [
          session[0].feedback[i].rating_count["1"],
          session[0].feedback[i].rating_count["2"],
          session[0].feedback[i].rating_count["3"],
          session[0].feedback[i].rating_count["4"]
        ];
        chartsData[i].data = temp;
      }
    }
    console.log(stats);
    setState({
      ...state,
      stats,
      chartsData,
      currentSessionId: session[0].id
    });
  };

  const handleClickNext = () => {
    let next = (state.currentChartId + 1) % state.chartsData.length;
    console.log(next, state.chartsData[next], chartsData);
    setState({
      ...state,
      currentChartId: next,
      currentChart: chartsData[next]
    });
  };

  const handleClickPrev = () => {
    let prev =
      (state.currentChartId - 1 + state.chartsData.length) %
      state.chartsData.length;

    console.log(prev, state.chartsData[prev], chartsData);
    setState({
      ...state,
      currentChartId: prev,
      currentChart: chartsData[prev]
    });
  };

  let {
    sessions,
    chartsData,
    currentChartId,
    stats,
    currentSessionId,
    currentChart
  } = state;
  console.log({ currentChart });
  return (
    <div
      style={{
        backgroundColor: "rgb(0,0,0,0.01)"
      }}
    >
      <span
        className="center"
        style={{
          color: "#faa551",
          fontSize: "150%",
          bold: true,
          fontFamily: ["Cairo", "sans-serif"]
        }}
      >
        {name + "'s Course Insights"}
      </span>
      <div className="flex">
        <LogOut history={props.history} />
        {/* <div>
          <img
            className="w-50 topLeftImage"
            alt="topLeftImage"
            src={topLeftImage}
          />
        </div> */}
      </div>
      <div className="flex">
        <div className="ml4 mt6">
          <SessionSelector
            sessions={sessions}
            setStats={setStats}
            selected={currentSessionId.toString()}
          />
        </div>
        <div
          className="w-100 vh-50"
          style={{
            backgroundColor: "rgb(255,255,255)",
            marginTop: "1%"
          }}
        >
          <div className="center w-70 flex justify-around flex-wrap-ns">
            {stats.map(stat => {
              return (
                <StatNumber key={stat.id} className="center" stat={stat} />
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="vh-50-ns w-100"
        style={{
          backgroundColor: "rgb(0,0,0,0.03)"
        }}
      >
        <div className="flex justify-around center">
          <button
            className="fa fa-caret-left grow"
            onClick={handleClickPrev}
            value="left"
            style={{
              fontSize: "100px",
              border: "0px",
              backgroundColor: "transparent",
              cursor: "pointer",
              color: "#faa551",
              outline: "none"
            }}
          ></button>
          <div
            className="mt3 w-40"
            style={{
              backgroundColor: "rgb(255,255,255)"
            }}
          >
            <StatChart
              chartData={currentChart}
              type={currentChart.chartType}
              colors={currentChart.labels.map(label => {
                return "#7f7aea";
              })}
            />
          </div>
          <button
            className="fa fa-caret-right grow"
            onClick={handleClickNext}
            value="right"
            style={{
              fontSize: "100px",
              border: "0px",
              backgroundColor: "transparent",
              cursor: "pointer",
              color: "#faa551",
              outline: "none"
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};
export default CourseStat;
