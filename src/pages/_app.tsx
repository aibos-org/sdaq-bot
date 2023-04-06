import 'styles.css';
import type {AppProps} from 'next/app';

const AppRoot = ({Component, pageProps}: AppProps) => {
  return <Component {...pageProps} />;
};

export default AppRoot;
