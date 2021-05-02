import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/Durax/redux-store';
import ReactDOM from 'react-dom';

// test('renders learn react link', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>, div);
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
//   ReactDOM.unmountComponentAtNode(div)
// });
