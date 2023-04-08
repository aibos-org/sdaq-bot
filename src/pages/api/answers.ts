import {GPTRequestBody, GPTResponse, AnswerRequestBody, AnswerResponseBody} from '@pages/types';
import axios from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';

const handler = (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
  const requestBody: AnswerRequestBody = req.body;
  const gptReqBody: GPTRequestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      {role: 'system', content: 'あなたは、与えられた文書を根拠に、質問に対する適切な回答を生成するアシスタントです。'},
      {role: 'user', content: `
与えられた文書を読んだ上で、質問に回答してください。
質問文: """${requestBody.question}"""
文書: """${requestBody.document}"""
`,
      },
    ],
    temperature: 0.7,
  };

  axios.post<GPTResponse>('https://api.openai.com/v1/chat/completions', gptReqBody, {
    headers: {Authorization: `Bearer ${process.env.OPENAI_API_KEY}`},
  })
      .then((response) => {
        console.log(response.data);
        const responseBody: AnswerResponseBody = {
          content: response.data.choices[0].message.content,
        };
        res.status(200).json(responseBody);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({message: 'Server Error'});
      });
};

export default handler;
