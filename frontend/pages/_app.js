import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import { AppProvider } from '../components/context';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </Provider>
  );
}

export default MyApp;
