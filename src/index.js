import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';
import storeCreate from './redux/store/store';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const history = History.createBrowserHistory();
export const store = storeCreate(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
