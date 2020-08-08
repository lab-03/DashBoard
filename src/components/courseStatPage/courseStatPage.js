import React, { useEffect, useState } from "react";
import LogOut from "../logout/LogOut";
import SessionSelector from "../SessionSelector/SessionSelector";
import QuestionsChart from "../questionChart/questionChart";
import "./courseStatPage.css";
const CourseStat = props => {
  const [state, setState] = useState({
    sessions: [
      { id: "1", date: "Sat Aug 08 2020 23:48:36" },
      { id: "2", date: "Sun Aug 09 2020 23:48:36" },
      { id: "3", date: "Mon Aug 10 2020 23:48:36" }
    ],
    getSessions: true
  });
  useEffect(() => {
    let { getSessions } = state;
    if (getSessions) {
      setState({ ...state, getSessions: false });
    }
  }, [state]);

  const getStat = id => {
    console.log(id);
  };

  let { sessions } = state;
  return (
    <div
      style={{
        backgroundColor: "rgb(0,0,0,0.1)"
      }}
    >
      <div className="flex">
        <LogOut history={props.history} />
        <div>
          <img className="w-30 mr7" alt="myCourses" src="myCoruses.png" />
        </div>
      </div>
      <div className="flex">
        <div className="mt4 ml4">
          <SessionSelector sessions={sessions} getStat={getStat} />
        </div>
        <div
          className="w-100 vh-50"
          style={{
            backgroundColor: "rgb(255,255,255)",
            marginTop: "1%"
          }}
        >
          stats
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
            <QuestionsChart
              question={{
                title: "teat",
                answer_1: "asta",
                answer_2: "aeta",
                answer_3: "asta",
                correctAnswer: null
              }}
            />
          </div>
          <button
            className="fa fa-caret-right grow"
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
