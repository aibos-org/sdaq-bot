import {SearchQuery} from 'types';

export const ChatComponent = (props: Props): JSX.Element => {
  const {state, handlers} = props;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
      <div>
        {state.history.map((item, index) => (
          <div key={index}>
            {item.type === 'question' ? (
              <div className="text-gray-700">
                <span className="font-bold">ユーザー：</span>
                {item.content}
              </div>
            ) : item.type === 'answer' ? (
              <div className="text-gray-700">
                <span className="font-bold">Bot：</span>
                {item.content}
              </div>
            ) : (
              <div className="text-gray-500">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={state.currentQuestion}
          onChange={handlers.changeQuestion}
          className="border-gray-400 border-2 p-2 rounded-lg w-full focus:outline-none focus:border-blue-400"
        />
      </div>
      <div className='flex flex-col'>
        <button
          onClick={handlers.submit}
          disabled={state.api.status !== 'FORM'}
          className={`
            ${state.api.status !== 'FORM' ? 'bg-gray-400' : 'bg-blue-500'}
          text-white font-bold
            py-2 px-4 rounded-lg mt-2 focus:outline-none focus:shadow-outline-blue
          `}
        >
          送信
        </button>
      </div>
    </div>
  );
};

export interface State {
  history: {
    content: string;
    type: 'question' | 'answer' | 'system';
  }[];
  currentQuestion: string;
  api: {
    status: 'FORM' // ユーザー入力待ち
      | 'CONNECTING' // 質問文から検索クエリを取得中
      | 'SEARCHING' // 検索クエリから検索結果を取得中
      | 'ANSWERING'; // 検索結果から回答を生成中
    queries: SearchQuery[];
    finishReason: string;
  }
}

export interface Handlers {
  changeQuestion: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submit: () => void;
}

interface Props {
  state: State;
  handlers: Handlers;
}

