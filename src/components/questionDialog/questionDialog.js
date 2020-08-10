import React, { useState, useEffect } from "react";
import QuestionChart from "../questionChart/questionChart";
import * as firebase from "firebase/app";
import "firebase/messaging";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  DialogTitle,
  TextField
} from "@material-ui/core";

const QuestionDialog = ({ handleClose, openDialog }) => {
  const [state, setState] = useState({
    question: {
      title: "",
      answer_1: "",
      answer_2: "",
      answer_3: "",
      correctAnswer: null
    },
    showChart: false,
    openDialog,
    handleClose,
    messaging: null,
    chartData: []
  });
  const initFcm = () => {
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: "AIzaSyAjvwUbAOVEFurP4YWKyAil7tO7yUEywys",
        authDomain: "attendance-tracker-2ae99.firebaseapp.com",
        databaseURL: "https://attendance-tracker-2ae99.firebaseio.com",
        projectId: "attendance-tracker-2ae99",
        storageBucket: "attendance-tracker-2ae99.appspot.com",
        messagingSenderId: "31866390285",
        appId: "1:31866390285:web:73c581b10481bb3ccd1244",
        measurementId: "G-EX0YD2QT78"
      };
      firebase.initializeApp(firebaseConfig);
      const messaging = firebase.messaging();
      messaging.usePublicVapidKey(
        "BBlRC7Gk3e52FAUzTI9t5A04hLV3rN6mAfC6qAr8lKqVJHQ0aAITl6xUlQyeM2ToGF3BOTO-FdiT696uaKQWQT0"
      );
      messaging
        .requestPermission()
        .then(async function() {
          console.log("permission granted");
          const token = await messaging.getToken();
          console.log(token);
          sendTokenToServer(token);
          return token;
        })
        .catch(function(err) {
          console.log("Unable to get permission to notify.", err);
        });
    }
    setState({ ...state, messaging: firebase.messaging() });
  };
  const sendTokenToServer = token => {
    fetch("https://a-tracker.herokuapp.com/users/add_device_token", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("accessToken"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
        "token-type": localStorage.getItem("tokenType"),
        expiry: localStorage.getItem("expiry")
      },
      body: JSON.stringify({
        device_token: { token, device_type: "web" }
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleSubmit = question => {
    let { messaging } = state;
    messaging.onMessage(payload => console.log("Message received. ", payload));
    if (
      !question.title ||
      !question.answer_1 ||
      !question.answer_2 ||
      !question.answer_3 ||
      !question.correctAnswer
    ) {
      alert("Please fill all fields!");
    } else setState({ ...state, showChart: true });
  };

  const handleFieldChange = event => {
    let target = event.target.name; // question title, answers or correctAnswer to be changed
    let prev = state.question; // prev question object
    prev[target] = event.target.value; // update the title or the code depending on which has been updated
    setState({ ...state, question: prev });
  };
  const closeDialog = event => {
    setState({
      ...state,
      question: {
        title: "",
        answer_1: "",
        answer_2: "",
        answer_3: "",
        correctAnswer: null
      }
    });
    setState({ ...state, showChart: false });
    state.handleClose();
  };

  useEffect(() => {
    let { messaging } = state;
    if (messaging === null) {
      initFcm();
    }
  });

  let { question, showChart, chartData } = state;
  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="question">
      <DialogTitle id="question">Question</DialogTitle>
      <DialogContent>
        <div className="flex">
          <div>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              name="title"
              type="text"
              disabled={showChart}
              value={question.title}
              required
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              onChange={handleFieldChange}
            />
            <TextField
              margin="dense"
              name="answer_1"
              label="Answer#1"
              type="text"
              disabled={showChart}
              value={question.answer_1}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              required
              onChange={handleFieldChange}
            />
            <TextField
              margin="dense"
              name="answer_2"
              label="Answer#2"
              type="text"
              disabled={showChart}
              value={question.answer_2}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              required
              onChange={handleFieldChange}
            />
            <TextField
              margin="dense"
              name="answer_3"
              label="Answer#3"
              type="text"
              disabled={showChart}
              value={question.answer_3}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              required
              onChange={handleFieldChange}
            />
          </div>
          <div className="pa3 mt3 w-50">
            <FormControl component="fieldset">
              <FormLabel component="legend">Correct Answer</FormLabel>
              <RadioGroup
                aria-label="correctAnswer"
                name="correctAnswer"
                value={question.correctAnswer}
                onChange={handleFieldChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio disabled={showChart} />}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio disabled={showChart} />}
                />
                <FormControlLabel
                  value="3"
                  control={<Radio disabled={showChart} />}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        {showChart ? (
          <QuestionChart question={question} data={chartData} />
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button value="cancel" onClick={closeDialog} color="primary">
          Close
        </Button>
        <Button
          value="send"
          onClick={() => handleSubmit(question)}
          color="primary"
          disabled={showChart}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionDialog;
