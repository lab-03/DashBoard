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
    sessions: [],
    currentSessionId: 1,
    getSessions: true,
    chartsData: [
      {
        id: "1",
        labels: ["1", "2", "3", "4"],
        dataSetLabel: "# of votes",
        data: [],
        title: "feedback Question: ",
        chartType: "bar"
      },
      {
        id: "2",
        labels: ["1", "2", "3", "4"],
        dataSetLabel: "# of votes",
        data: [],
        title: "feedback Question: ",
        chartType: "bar"
      },
      {
        id: "3",
        labels: ["1", "2", "3", "4"],
        dataSetLabel: "# of votes",
        data: [],
        title: "feedback Question: ",
        chartType: "bar"
      },
      {
        id: "4",
        labels: [],
        dataSetLabel: "# of students",
        data: [],
        title: "Attendees per session",
        chartType: "line"
      }
    ],
    currentChartId: "0",
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
      // let sessions = [
      //   {
      //     id: 1,
      //     duration: null,
      //     ended_at: "2020-08-08T21:42:26.940Z",
      //     created_at: "2020-08-06T17:53:57.818Z",
      //     updated_at: "2020-08-08T21:42:26.941Z",
      //     apply_checks: true,
      //     lat: null,
      //     long: null,
      //     qr_code_base64: null,
      //     token: "8toQnfsT8gkjokENoHo91Ccs",
      //     by_teacher: { name: "Macy Beahan", user_id: 1, lecturer_id: 1 },
      //     attendance: {
      //       total_students: 21,
      //       attended_students: 10,
      //       unattended_students: 21
      //     },
      //     interactive_quizzes: [
      //       {
      //         name: "hamada",
      //         total_students: 21,
      //         total_right_answers: 28,
      //         total_questions: 4,
      //         questions: [
      //           {
      //             text: "question #1",
      //             choices: [
      //               { text: "choice 1", correct: true, no_students_choosed: 7 },
      //               {
      //                 text: "choice 2",
      //                 correct: false,
      //                 no_students_choosed: 7
      //               },
      //               { text: "choice 3", correct: false, no_students_choosed: 7 }
      //             ]
      //           },
      //           {
      //             text: "question #2",
      //             choices: [
      //               {
      //                 text: "choice 1123",
      //                 correct: true,
      //                 no_students_choosed: 2
      //               },
      //               {
      //                 text: "choice 2123",
      //                 correct: false,
      //                 no_students_choosed: 72
      //               },
      //               {
      //                 text: "choice 3123",
      //                 correct: false,
      //                 no_students_choosed: 6
      //               }
      //             ]
      //           },
      //           {
      //             text: "question #3",
      //             choices: [
      //               {
      //                 text: "choice dsa1",
      //                 correct: true,
      //                 no_students_choosed: 78
      //               },
      //               {
      //                 text: "choice fds2",
      //                 correct: false,
      //                 no_students_choosed: 77
      //               },
      //               {
      //                 text: "choice asd3",
      //                 correct: false,
      //                 no_students_choosed: 7
      //               }
      //             ]
      //           },
      //           {
      //             text: "question #4",
      //             choices: [
      //               {
      //                 text: "choice ggg",
      //                 correct: true,
      //                 no_students_choosed: 75
      //               },
      //               {
      //                 text: "choice ggg2",
      //                 correct: false,
      //                 no_students_choosed: 74
      //               },
      //               {
      //                 text: "choice ggg3",
      //                 correct: false,
      //                 no_students_choosed: 72
      //               }
      //             ]
      //           }
      //         ],
      //         ended_at: null,
      //         started_at: "2020-08-11T12:22:20.113Z"
      //       }
      //     ],
      //     feedback: [
      //       {
      //         text: "3",
      //         average_rating: 2.5,
      //         rating_count: { "1": 5, "2": 5, "3": 5, "4": 5 },
      //         students_submitted: 20
      //       },
      //       {
      //         text: "3",
      //         average_rating: 2.5,
      //         rating_count: { "1": 10, "2": 5, "3": 5, "4": 5 },
      //         students_submitted: 20
      //       },
      //       {
      //         text: "2",
      //         average_rating: 2.5,
      //         rating_count: { "1": 5, "2": 9, "3": 5, "4": 5 },
      //         students_submitted: 20
      //       },
      //       {
      //         text: "1",
      //         average_rating: 2.5,
      //         rating_count: { "1": 5, "2": 5, "3": 7, "4": 5 },
      //         students_submitted: 20
      //       },
      //       {
      //         text: "3",
      //         average_rating: 2.5,
      //         rating_count: { "1": 5, "2": 5, "3": 5, "4": 5 },
      //         students_submitted: 20
      //       },
      //       {
      //         text: "3",
      //         average_rating: 2.5,
      //         rating_count: { "1": 5, "2": 5, "3": 5, "4": 5 },
      //         students_submitted: 20
      //       },
      //       {
      //         text: "2",
      //         average_rating: 2.5,
      //         rating_count: { "1": 5, "2": 5, "3": 5, "4": 5 },
      //         students_submitted: 20
      //       },
      //       {
      //         text: "1",
      //         average_rating: 2.5,
      //         rating_count: { "": 20, "1": 5, "2": 5, "3": 5, "4": 5 },
      //         students_submitted: 40
      //       }
      //     ]
      //   }
      // ];
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
          // console.log(sessions);
          let { stats, chartsData, currentSessionId } = state;
          stats[0].value = sessions[0].attendance.attended_students;
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

          chartsData[3].labels = sessions.map(session => {
            return session.id;
          });
          chartsData[3].data = sessions.map(session => {
            return session.attendance.attended_students;
          });

          let session = sessions.filter(session => {
            return session.id === currentSessionId;
          });

          let numberOfQuestions =
            session[0].interactive_quizzes[0].questions.length;

          for (let i = 0; i < numberOfQuestions; i++) {
            let questionChart = {
              id: chartsData.length,
              labels: [
                session[0].interactive_quizzes[0].questions[i].choices[0].text,
                session[0].interactive_quizzes[0].questions[i].choices[1].text,
                session[0].interactive_quizzes[0].questions[i].choices[2].text
              ],
              dataSetLabel: "# of votes",
              data: [
                session[0].interactive_quizzes[0].questions[i].choices[0]
                  .no_students_choosed,
                session[0].interactive_quizzes[0].questions[i].choices[1]
                  .no_students_choosed,
                session[0].interactive_quizzes[0].questions[i].choices[2]
                  .no_students_choosed
              ],
              title: session[0].interactive_quizzes[0].questions[i].text,
              chartType: "bar"
            };
            chartsData.push(questionChart);
          }

          for (let i = 0; i < 3; i++) {
            let temp = [
              session[0].feedback[i].rating_count["1"],
              session[0].feedback[i].rating_count["2"],
              session[0].feedback[i].rating_count["3"],
              session[0].feedback[i].rating_count["4"]
            ];
            chartsData[i].data = temp;
          }

          console.log(sessions);
          setState({
            ...state,
            sessions: sessions,
            chartsData,
            stats,
            getSessions: false
          });
        })
        .catch(err => console.log(err));
    }
  }, [state, code]);

  const setStats = (sessions, id) => {
    let { stats } = state;
    let session = sessions.filter(session => {
      return session.id.toString() === id;
    });
    console.log(id, session[0]);
    stats[0].value = session[0].attendance.attended_students;
    stats[1].value = sessions[0].interactive_quizzes.total_questions;
    stats[2].value = session[0].interactive_quizzes.total_students;
    stats[3].value =
      (stats[0].value * session[0].interactive_quizzes.total_students) / 100;
    stats[4].value = session[0].interactive_quizzes.total_right_answers;
    stats[5].value =
      (session[0].interactive_quizzes.total_students * stats[4].value) / 100;
    stats[0].value = session[0].attendance.attended_students;

    console.log(stats);

    setState({
      ...state,
      stats,
      currentSessionId: session.id
    });
  };

  const handleClickNext = () => {
    let next = (state.currentChartId + 1) % state.chartsData.length;
    setState({ ...state, currentChartId: next });
  };

  const handleClickPrev = () => {
    let prev =
      (state.currentChartId - 1 + state.chartsData.length) %
      state.chartsData.length;
    setState({ ...state, currentChartId: prev });
  };

  let { sessions, chartsData, currentChartId, stats } = state;
  console.log(sessions);
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
          <SessionSelector sessions={sessions} setStats={setStats} />
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
              chartData={chartsData[currentChartId]}
              type={chartsData[currentChartId].chartType}
              colors={chartsData[currentChartId].labels.map(label => {
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
