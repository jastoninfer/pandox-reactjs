import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
// import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import store from './store';
// import 'commons/style/variables.css';
import './index.css';

const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement) {
    const root: ReactDOM.Root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    {/* <ScrollToTop/> */}
                    <StyleSheetManager shouldForwardProp={() => true}>
                        <App />
                    </StyleSheetManager>
                </Router>
            </Provider>
        </React.StrictMode>
    );
    reportWebVitals();
} else {
    throw new Error("Unable to find root element 'root'");
}
