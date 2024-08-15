import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import user from '../reducers/user';
import search from '../reducers/search'
import Header from '../components/Header/Header';

//redux-persist imports
import {persistStore, persistReducer} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({user, search});
const persistConfig = {key: 'AppliTest', storage};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (      

      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <Head>
          <title>Kairos</title>
          <meta name="description" content="Kairos vous aide à mieux prévoir votre projet entreprenarial" lang="fr"/>
        </Head>
        {<Header />}
        <Component {...pageProps} />
        </PersistGate>
      </Provider>

  );
}

export default App;
