import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/ReactToastify.css';
import './styles/styles.scss';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
  root.render(
    <Provider store={reduxStore}>
      <IntlProviderWrapper>
        <App persistor={persistor} />
      </IntlProviderWrapper>
    </Provider>
  );
};

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();
