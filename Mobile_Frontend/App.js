import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-url-polyfill/auto';
import store, { persistor } from './store/store';
import AppNavigator from './navigation/AppNavigation';
import { useFonts } from './utils/fonts';

// Ignore specific warnings
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

const App = () => {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    // This is where you'd show a fallback UI until fonts are loaded
    return null;  // Or you could replace it with any placeholder, like a simple loading spinner.
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
