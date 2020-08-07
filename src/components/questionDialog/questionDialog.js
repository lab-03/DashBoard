import React, { useState } from "react";
import QuestionChart from "../questionChart/questionChart";

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
    handleClose
  });
  const handleSubmit = question => {
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
  let { question, showChart } = state;
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
                  value="answer#1"
                  control={<Radio disabled={showChart} />}
                />
                <FormControlLabel
                  value="answer#2"
                  control={<Radio disabled={showChart} />}
                />
                <FormControlLabel
                  value="answer#3"
                  control={<Radio disabled={showChart} />}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        {showChart ? <QuestionChart question={question} /> : null}
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
