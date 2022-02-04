import '../styles/global.css';
import '../styles/components/alert.css';
import NextNprogress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import Alert from '../components/Alert';

function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
      <Provider store={store}>
          <NextNprogress
              color="#03a9f4"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
              showOnShallow={true}
          />
          <Component {...pageProps} />
          <Alert />
      </Provider>
  )
}

export default App
