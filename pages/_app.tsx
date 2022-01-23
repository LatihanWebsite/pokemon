import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'components/Layout';
import { Provider } from 'react-redux';
import store from 'store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

export default MyApp;
