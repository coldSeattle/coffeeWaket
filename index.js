/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { persistor, store } from './src/app/store';
import { Provider } from 'react-redux';
import React from 'react';
import App from './src/app/App';
import { PersistGate } from 'redux-persist/integration/react';

AppRegistry.registerComponent(appName, () => () => (
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
));
