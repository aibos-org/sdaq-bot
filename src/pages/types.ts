export interface SearchQuery {
  weight: number;
  word: string;
};

export interface QueriesRequestBody {
  question: string;
};
export interface QueriesResponseBody {
  queries: SearchQuery[];
};

export interface DocumentsResponseBody {
  documents: {
    title: string;
    id: string;
    content: string;
  }[];
};

export interface AnswerRequestBody {
  question: string;
  document: string;
};
export interface AnswerResponseBody {
  content: string;
};

export interface GPTRequestBody {
  model: 'gpt-3.5-turbo',
  messages: {
    role: 'system' | 'user' | 'assystant',
    content: string,
  }[],
  temperature: number,
}
export interface GPTResponse {
  id: string,
  object: 'chat.completion',
  created: number,
  model: 'gpt-3.5-turbo',
  usage: { 'prompt_tokens': number, 'completion_tokens': number, 'total_tokens': number },
  choices: [
    {
      'message': {
        'role': 'assistant',
        'content': string,
      },
      'finish_reason': 'stop' | 'length' | 'content_filter' | 'null' | null,
      'index': 0;
    },
  ];
};
