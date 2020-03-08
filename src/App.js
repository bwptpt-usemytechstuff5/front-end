import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RentContext from './contexts/RentContext';
import CartContext from './contexts/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Logout from './components/Logout';
import RentalMap from './components/RentalMap';
import EditRental from './components/EditRental';
import AddRental from './components/AddRental';
import RenterMap from './components/RenterMap';
import Cart from './components/Cart';
import './App.css';

function App() {
	const [rental, setRental] = useState([
		{
			id: '',
			type: '',
			model: '',
			description: '',
			rentalPrice: ''
		}
	]);

	const [cart, setCart] = useState([
		{
			id: '',
			type: '',
			model: '',
			description: '',
			rentalPrice: ''
		}
	]);

	return (
		<div className='App'>
			<RentContext.Provider value={{ rental, setRental }}>
				<CartContext.Provider value={{ cart, setCart }}>
					<Router>
						<Switch>
							<Route exact path='/' component={Login} />
							<ProtectedRoute path='/logout' component={Logout} />
							<ProtectedRoute exact path='/rental' component={RentalMap} />
							<ProtectedRoute path='/rental/:id' component={EditRental} />
							<ProtectedRoute path='/add' component={AddRental} />
							<ProtectedRoute exact path='/renter' component={RenterMap} />
							<ProtectedRoute exact path='/cart' component={Cart} />
						</Switch>
					</Router>
				</CartContext.Provider>	
			</RentContext.Provider>
		</div>
	);
}

export default App;
