import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CheckoutView from './views/CheckoutView';
import ThanksView from './views/ThanksView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={CheckoutView}/>
        <Route path='/thank-you/:transactionId' Component={ThanksView}/>
      </Routes>
    </Router>
  );
}

export default App;
