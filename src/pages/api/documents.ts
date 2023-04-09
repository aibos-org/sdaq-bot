import axios, {AxiosResponse} from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';
import {DocumentsResponseBody} from 'types';

export interface SolrResponseBody {
  response: {
    docs: {
      id: string;
      title: string;
      content: string;
    }[];
  };
  numFound: number;
  start: number;
};

const buildQueryString = (params: {[key: string]: string}) => {
  const keys = Object.keys(params);
  const parts = keys.map((key) => {
    const value = encodeURIComponent(params[key]);
    return `${key}=${value}`;
  });
  return parts.join('&');
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const searchTerm = req.query.q as string;
  const solrUrl = 'http://localhost:8983/solr/manuals/select';
  const params = {
    'q': `content:${searchTerm}`,
    'q.op': 'OR',
  };
  const queryParams = buildQueryString(params);
  axios.get(`${solrUrl}?${queryParams}`)
      .then((response: AxiosResponse<SolrResponseBody>) => {
        const docs = response.data.response.docs;
        console.log(response.data);
        const resBody: DocumentsResponseBody = {
          documents: docs.map((doc) => ({
            title: doc.title,
            id: doc.id,
            content: doc.content,
          })),
        };
        res.status(200).json(resBody);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({message: 'Server error'});
      });
};

export default handler;
