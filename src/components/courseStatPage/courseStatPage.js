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
    getSessions: true,
    chartsData: [
      {
        id: "1",
        labels: [],
        dataSetLabel: "# of students",
        data: [],
        title: "Attendees per sessions",
        chartType: "line"
      },
      {
        id: "2",
        labels: ["1", "2", "3"],
        dataSetLabel: "lorem epsum",
        data: [10, 60, 15],
        title: "feedback Question: what asdasfa",
        chartType: "bar"
      },
      {
        id: "3",
        labels: ["1", "2", "3"],
        dataSetLabel: "lorem epsum",
        data: [10, 100, 15],
        title: "third",
        chartType: "bar"
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
          let { stats, chartsData } = state;
          stats[0].value = sessions[0].attendance.attended_students;
          // stats[1].value = sessions[0].attendance.attended_students;
          stats[2].value = sessions[0].participants.total_students;
          stats[3].value =
            (stats[0].value * sessions[0].participants.total_students) / 100 +
            "%";
          stats[4].value = sessions[0].participants.total_right_answers;
          stats[5].value =
            (sessions[0].participants.total_students * stats[4].value) / 100 +
            "%";

          chartsData[0].labels = sessions.map(session => {
            return session.created_at;
          });
          chartsData[0].data = sessions.map(session => {
            return session.attendance.attended_students;
          });
          setState({
            ...state,
            sessions: sessions,
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
    // stats[1].value = session[0].attendance.attended_students;
    stats[2].value = session[0].participants.total_students;
    stats[3].value =
      (stats[0].value * session[0].participants.total_students) / 100;
    stats[4].value = session[0].participants.total_right_answers;
    stats[5].value =
      (session[0].participants.total_students * stats[4].value) / 100;
    stats[0].value = session[0].attendance.attended_students;

    console.log(stats);

    setState({
      ...state,
      stats
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
  console.log(chartsData[currentChartId]);
  return (
    <div
      style={{
        backgroundColor: "rgb(0,0,0,0.1)"
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
          backgroundColor: "rgb(0,0,0,0.1)"
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
          <div className=" w-40">
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
