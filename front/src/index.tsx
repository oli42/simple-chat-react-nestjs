import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { persistor} from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { socket, SocketContext } from './context/Socket';

ReactDOM.render(
  <React.StrictMode>
     <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


