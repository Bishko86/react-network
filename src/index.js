import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './components/Durax/redux-store';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
ReactDOM.render(
    <React.StrictMode>
        < BrowserRouter>
            <Provider store={store}>
                <App navbar={store.getState().navbarPage} />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
