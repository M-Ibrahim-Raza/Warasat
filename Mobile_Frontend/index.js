import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { name as appName } from "./app.json";

// Register the app
AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
));