import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import RentContext from './contexts/RentContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Rental from './components/Rental';
import EditRental from './components/EditRental';
import AddRental from './components/AddRental';
import './App.css';

function App() {
  
  const [rental, setRental] = useState ([
    {
      id: '',
      technologyType: '',
      model: '',
      description: '',
      rentalPrice: '',
      datePosted: ''
    }
  ]);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Use My Tech Stuff</h1>
      </header>
      <RentContext.Provider value={{ rental, setRental }}>
        <Router>
            <ul>
              <li>
                <Link to='/'>Login</Link>
              </li>
              <li>
                <Link to='/rental'>My Available Rentals</Link>
              </li>
              <li>
                <Link to='/add'>Add Rental</Link>
              </li>
            </ul>
            <Switch>
              <Route exact path='/' component={Login} />
              <ProtectedRoute exact path='/rental' component={Rental} />
              <ProtectedRoute path='/rental/:id' component={EditRental} />
              <ProtectedRoute path='/add' component={AddRental} />
            </Switch>
          </Router>
      </RentContext.Provider>
    </div>
  );
}

export default App;
