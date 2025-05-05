// App.js
import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './src/store/store';
import AppNavigator from './navigation/AppNavigator';
import { useFonts } from './src/utils/fonts';
import LoadingScreen from './src/components/LoadingScreen';

// Ignore specific warnings
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

const App = () => {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return <LoadingScreen message="Loading fonts..." />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;