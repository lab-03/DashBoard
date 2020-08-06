import React, { useState } from "react";

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

const QuestionDialog = ({ handleClose, handleSubmit, openDialog }) => {
  const [state, setState] = useState({
    question: {
      title: "",
      answer_1: "",
      answer_2: "",
      answer_3: "",
      correctAnswer: null
    },
    openDialog,
    handleClose,
    handleSubmit
  });

  const handleFieldChange = event => {
    let target = event.target.name; // question title, answers or correctAnswer to be changed
    let prev = state.question; // prev question object
    prev[target] = event.target.value; // update the title or the code depending on which has been updated
    setState({ ...state, question: prev });
  };
  const closeDialog = event => {
    let { question } = state;
    let { currentTarget } = event;
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
    if (currentTarget.value === "send") {
      state.handleSubmit(question);
    } else {
      state.handleClose(question);
    }
  };
  let { question } = state;
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
                <FormControlLabel value="answer#1" control={<Radio />} />
                <FormControlLabel value="answer#2" control={<Radio />} />
                <FormControlLabel value="answer#3" control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button value="cancel" onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button value="send" onClick={closeDialog} color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionDialog;
