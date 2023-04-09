import {State} from '@components/index';
import {AxiosResponse} from 'axios';
import {AnswerResponseBody, DocumentsResponseBody, QueriesResponseBody} from './types';

export const reduceQueriesResponse = (
    response: AxiosResponse<QueriesResponseBody>,
    prev: State,
): State => {
  const resBody = response.data;
  return {
    ...prev,
    history: [
      ...prev.history,
      {
        content: `以下を検索中: ${resBody.queries.map((query) => query.word).join(' ')}`,
        type: 'system',
      },
    ],
    api: {
      ...prev.api,
      status: 'SEARCHING',
      queries: resBody.queries,
    },
  };
};

export const reduceHistory = (prev: State): State => ({
  ...prev,
  api: {...prev.api, status: 'CONNECTING'},
  history: [
    ...prev.history,
    {
      content: prev.currentQuestion,
      type: 'question',
    },
    {
      content: 'チャットに接続中...',
      type: 'system',
    },
  ],
  currentQuestion: '',
});

export const reduceDocumentsResponse = (
    response: AxiosResponse<DocumentsResponseBody>,
    prev: State,
): State => ({
  ...prev,
  history: [
    ...prev.history,
    {
      type: 'system',
      content: `文書 "${response.data.documents[0].title}" を基に回答を生成します。`,
    },
  ],
  api: {
    ...prev.api,
    status: 'ANSWERING',
  },
});

export const reduceAnswerResponse = (
    response: AxiosResponse<AnswerResponseBody>,
    prev: State,
): State => ({
  ...prev,
  history: [
    ...prev.history,
    {
      type: 'answer',
      content: response.data.content,
    },
  ],
  api: {
    ...prev.api,
    status: 'FORM',
  },
});
