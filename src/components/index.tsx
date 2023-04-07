export const ChatComponent = (props: Props): JSX.Element => {
  const {state, handlers} = props;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
      <div>
        {state.history.map((item, index) => (
          <div key={index}>
            <p className="font-medium mb-2">質問：{item.question}</p>
            <p className="text-gray-600">{item.answer}</p>
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
        <button
          onClick={handlers.submit}
          className={`
          bg-blue-500 hover:bg-blue-600 text-white font-bold
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
  history: { question: string; answer: string }[];
  currentQuestion: string;
}

export interface Handlers {
  changeQuestion: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submit: () => void;
}

interface Props {
  state: State;
  handlers: Handlers;
}

