import axios from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';
import {GPTRequestBody, GPTResponse, QueriesResponseBody} from 'types';


const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const {question} = req.body;
  const requestBody: GPTRequestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      {role: 'system', content: 'あなたはJSONファイルを返すAPIです。'},
      {role: 'user', content: `
私が与える質問に答えるためには、どのような単語列でマニュアル文書を検索したらいいか考えてください。
単語に重要度を重み付けした上で、与えられた出力形式で単語の配列を格納したJSONを作成してください。
回答は、文章ではなく、JSONのみで結構です。
出力形式:
"""
interface Response {
  queries: {
    weight: number; // 0-1
    word: string;
  }[];
};
"""

質問:
${question}
`,
      },
    ],
    temperature: 0.7,
  };

  axios.post<GPTResponse>('https://api.openai.com/v1/chat/completions', requestBody, {
    headers: {Authorization: `Bearer ${process.env.OPENAI_API_KEY}`},
  })
      .then((response) => {
        console.log(response.data);
        const responseBody = JSON.parse(response.data.choices[0].message.content) as QueriesResponseBody;
        res.status(200).json(responseBody);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({message: 'Server Error'});
      });
};

export default handler;
