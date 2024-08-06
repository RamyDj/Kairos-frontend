import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user';
import search from '../reducers/search'
import Header from '../components/Header/Header';

const store = configureStore({
  reducer: { user,search },
});

function App({ Component, pageProps }) {
  return (      

      <Provider store={store}>
        <Head>
          <title>Kairos</title>
        </Head>
        {<Header />}
        <Component {...pageProps} />
      </Provider>

  );
}

export default App;
