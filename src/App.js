import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RentContext from './contexts/RentContext';
import ProtectedRoute from './components/ProtectedRoute';
//import Login from './components/Login';
import LoginOld from './components/LoginOld';
import Logout from './components/Logout';
import RentalMap from './components/RentalMap';
import EditRental from './components/EditRental';
import AddRental from './components/AddRental';
import RenterMap from './components/RenterMap';
import './App.css';

function App() {
	const [rental, setRental] = useState([
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
		<div className='App'>
			<RentContext.Provider value={{ rental, setRental }}>
				<Router>
					<Switch>
						<Route exact path='/' component={LoginOld} />
						<ProtectedRoute path='/logout' component={Logout} />
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
