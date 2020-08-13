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
  TextField,
} from "@material-ui/core";

const QuestionDialog = ({ handleClose, openDialog, hash }) => {
  const [state, setState] = useState({
    question: {
      title: "",
      answer_1: "",
      answer_2: "",
      answer_3: "",
      correctAnswer: null,
    },
    showChart: false,
    openDialog,
    handleClose,
    chartData: [0, 0, 0],
  });
  const initFcm = () => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_apiKey,
      authDomain: process.env.REACT_APP_authDomain,
      databaseURL: process.env.REACT_APP_databaseURL,
      projectId: process.env.REACT_APP_projectId,
      storageBucket: process.env.REACT_APP_storageBucket,
      messagingSenderId: process.env.REACT_APP_messagingSenderId,
      appId: process.env.REACT_APP_appId,
      measurementId: process.env.REACT_APP_measurementId,
    };
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey(process.env.REACT_APP_apiPubKey);
    messaging
      .requestPermission()
      .then(async function () {
        console.log("permission granted");
        const token = await messaging.getToken();
        console.log(token);
        // sendTokenToServer(token);
        return token;
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
    messaging.onMessage((payload) =>
      console.log("Message received. ", payload)
    );

    console.log({ messaging });
    return messaging;
  };
  const sendTokenToServer = (token) => {
    fetch("https://a-tracker.herokuapp.com/users/add_device_token", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("accessToken"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
        "token-type": localStorage.getItem("tokenType"),
        expiry: localStorage.getItem("expiry"),
      },
      body: JSON.stringify({
        device_token: { token, device_type: "web" },
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (question) => {
    if (
      !question.title ||
      !question.answer_1 ||
      !question.answer_2 ||
      !question.answer_3 ||
      !question.correctAnswer
    ) {
      alert("Please fill all fields!");
    } else {
      fetch(
        `https://a-tracker.herokuapp.com/sessions/${hash}/interactive_quiz`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "access-token": localStorage.getItem("accessToken"),
            client: localStorage.getItem("client"),
            uid: localStorage.getItem("uid"),
            "token-type": localStorage.getItem("tokenType"),
            expiry: localStorage.getItem("expiry"),
          },
          body: JSON.stringify({
            interactive_quiz: {
              name: "question",
              questions_attributes: [
                {
                  text: question.title,
                  choices_attributes: [
                    {
                      text: question.answer_1,
                      correct: question.correctAnswer === 1 ? true : false,
                      choice_num: "1",
                    },
                    {
                      text: question.answer_2,
                      correct: question.correctAnswer === 2 ? true : false,
                      choice_num: "2",
                    },
                    {
                      text: question.answer_3,
                      correct: question.correctAnswer === 3 ? true : false,
                      choice_num: "3",
                    },
                  ],
                },
              ],
            },
          }),
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw Error(response.statusText);
          }
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      setState({ ...state, showChart: true });
    }
  };

  const handleFieldChange = (event) => {
    let target = event.target.name; // question title, answers or correctAnswer to be changed
    let prev = state.question; // prev question object
    prev[target] = event.target.value; // update the title or the code depending on which has been updated
    setState({ ...state, question: prev });
  };
  const closeDialog = (event) => {
    setState({
      ...state,
      question: {
        title: "",
        answer_1: "",
        answer_2: "",
        answer_3: "",
        correctAnswer: null,
      },
    });
    setState({ ...state, showChart: false, chartData: [0, 0, 0] });
    state.handleClose();
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      initFcm();
      navigator.serviceWorker.addEventListener("message", (message) => {
        // console.log(message);
        // console.log(
        //   message.data["firebase-messaging-msg-data"].data.choice_num
        // );
        let answerNumber =
          message.data["firebase-messaging-msg-data"].data.choice_num;
        let { chartData } = state;
        chartData[answerNumber - 1] += 1;
        console.log(message, chartData);
        setState({ ...state, showChart: false });
        setState({ ...state, showChart: true, chartData });
      });
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
                shrink: true,
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
                shrink: true,
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
                shrink: true,
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
                shrink: true,
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
