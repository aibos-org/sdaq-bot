import axios from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';

interface RequestBody {
  model: 'gpt-3.5-turbo',
  messages: {
    role: 'system' | 'user' | 'assystant',
    content: string,
  }[],
  temperature: number,
}

interface Response {
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
      'index': 0
    }
  ]
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const {question} = req.body;

  const requestBody: RequestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      {role: 'system', content: 'You are a helpful assistant.'},
      {role: 'user', content: question},
    ],
    temperature: 0.7,
  };

  axios.post<Response>('https://api.openai.com/v1/chat/completions', requestBody, {
    headers: {Authorization: `Bearer ${process.env.OPENAI_API_KEY}`},
  })
      .then((response) => {
        const answer = response.data.choices[0].message.content;
        res.status(200).json({answer});
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({message: 'Server Error'});
      });
};

export default handler;
