import {State, Handlers, ChatComponent} from '@components/index';
import axios, {AxiosResponse} from 'axios';
import {useState} from 'react';
import {
  AnswerRequestBody,
  AnswerResponseBody,
  DocumentsResponseBody,
  QueriesRequestBody,
  QueriesResponseBody,
} from '../types';
import {reduceAnswerResponse, reduceDocumentsResponse, reduceHistory, reduceQueriesResponse} from '../utils';

const ControllerComponent = () => {
  const [state, setState] = useState<State>({
    history: [],
    currentQuestion: '',
    api: {
      queries: [],
      finishReason: '',
      status: 'FORM',
    },
  });

  const handlers: Handlers = {
    changeQuestion: (event) => {
      setState({...state, currentQuestion: event.target.value});
    },
    submit: () => {
      setState(reduceHistory);
      const queriesReqBody: QueriesRequestBody = {question: state.currentQuestion};
      axios
          .post('/api/queries', queriesReqBody)
          .then((response: AxiosResponse<QueriesResponseBody>) => {
            setState((prev) => reduceQueriesResponse(response, prev));
            return axios.get(`/api/documents?q=${
              response.data.queries.map((query) => query.word).join('+')
            }`);
          })
          .then((response: AxiosResponse<DocumentsResponseBody>) => {
            setState((prev) => reduceDocumentsResponse(response, prev));
            const reqBody: AnswerRequestBody = {
              question: state.currentQuestion,
              document: response.data.documents[0].content,
            };
            return axios.post('/api/answers', reqBody);
          })
          .then((response: AxiosResponse<AnswerResponseBody>) => {
            setState((prev) => reduceAnswerResponse(response, prev));
          })
          .catch((error) => {
            console.error(error);
          });
    },
  };

  return <ChatComponent state={state} handlers={handlers} />;
};

export default ControllerComponent;
