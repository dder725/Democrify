import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import Loader from "react-loader-spinner";
import { store, persistor } from "./redux/store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import Notifications from 'react-notify-toast';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={
        <Loader type="ThreeDots" color="#1ECD97" height={100} width={100} />
      }
      persistor={persistor}
    >
      <Notifications/>
      <App />
    </PersistGate>
  </Provider>,
  document.querySelector("#root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
