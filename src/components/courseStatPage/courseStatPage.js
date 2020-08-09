import React, { useEffect, useState } from "react";
import LogOut from "../logout/LogOut";
import SessionSelector from "../SessionSelector/SessionSelector";
import StatChart from "../StatChart/StatChart";
import StatNumber from "../StatNumber/StatNumber";
import "./courseStatPage.css";
import topLeftImage from "./topLeft.png";

const CourseStat = props => {
  const [state, setState] = useState({
    sessions: [
      { id: "1", date: "Sat Aug 08 2020 23:48:36" },
      { id: "2", date: "Sun Aug 09 2020 23:48:36" },
      { id: "3", date: "Mon Aug 10 2020 23:48:36" }
    ],
    getSessions: true,
    chartsData: [
      {
        id: "1",
        labels: ["1", "2", "3"],
        dataSetLabel: "lorem epsum",
        data: [10, 60, 15],
        title: "first",
        chartType: "bar"
      },
      {
        id: "2",
        labels: ["1", "2", "3"],
        dataSetLabel: "lorem epsum",
        data: [10, 30, 10],
        title: "second",
        chartType: "line"
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
        title: "test",
        value: "50%"
      },
      {
        title: "test1",
        value: "50"
      },
      {
        title: "test2",
        value: "60"
      },
      {
        title: "test3",
        value: "43%"
      },
      {
        title: "test",
        value: "50%"
      },
      {
        title: "test1",
        value: "50"
      },
      {
        title: "test2",
        value: "60"
      },
      {
        title: "test3",
        value: "43%"
      },
      {
        title: "test1",
        value: "50"
      },
      {
        title: "test2",
        value: "60"
      },
      {
        title: "test3",
        value: "43%"
      }
    ]
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
      <div className="flex">
        <LogOut history={props.history} />
        <div>
          <img
            className="w-30 topLeftImage"
            alt="topLeftImage"
            src={topLeftImage}
          />
        </div>
      </div>
      <div className="flex">
        <div className="ml4">
          <SessionSelector sessions={sessions} getStat={getStat} />
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
              return <StatNumber className="center" stat={stat} />;
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
