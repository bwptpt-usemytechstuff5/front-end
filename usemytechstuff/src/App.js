import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RentContext from './contexts/RentContext';
import ProtectedRoute from './components/ProtectedRoute';
//import Login from './components/Login';
import LoginOld from './components/LoginOld';
import RentalMap from './components/RentalMap';
import EditRental from './components/EditRental';
import AddRental from './components/AddRental';
import RenterMap from './components/RenterMap';
import './App.css';

function App() {
  
  const [rental, setRental] = useState ([
    {
      id: '',
      type: '',
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
           {/* <ul className='TopLinks'>
              <li>
                <Link className='ListLinks' to='/'>Login</Link>
              </li>
              <li>
                <Link className='ListLinks' to='/rental'>My Available Rentals</Link>
              </li>
              <li>
                <Link className='ListLinks' to='/add'>Add Rental</Link>
              </li>
           </ul> */}
            <Switch>
              <Route exact path='/' component={LoginOld} />
              <ProtectedRoute exact path='/rental' component={RentalMap} />
              <ProtectedRoute path='/rental/:id' component={EditRental} />
              <ProtectedRoute path='/add' component={AddRental} />
              <ProtectedRoute exact path='/renter' component={RenterMap} />
            </Switch>
          </Router>
      </RentContext.Provider>
    </div>
  );
}

export default App;
