import {State, Handlers, ChatComponent} from '@components/index';
import axios from 'axios';
import {useState} from 'react';

const ControllerComponent = () => {
  const [state, setState] = useState<State>({
    history: [],
    currentQuestion: '',
  });

  const handlers: Handlers = {
    changeQuestion: (event) => {
      setState({...state, currentQuestion: event.target.value});
    },
    submit: () => {
      axios
          .post('/api/question', {question: state.currentQuestion})
          .then((response) => {
            const newQuestion = state.currentQuestion;
            const newAnswer = response.data.answer;
            const newHistory = [...state.history, {question: newQuestion, answer: newAnswer}];
            setState({history: newHistory, currentQuestion: ''});
          })
          .catch((error) => {
            console.error(error);
          });
    },
  };

  return <ChatComponent state={state} handlers={handlers} />;
};

export default ControllerComponent;
