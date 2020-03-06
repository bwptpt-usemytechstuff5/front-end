import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import RentContext from './contexts/RentContext';
import ProtectedRoute from './components/ProtectedRoute';
//import Login from './components/Login';
import LoginOld from './components/LoginOld';
import Logout from './components/Logout';
import RentalMap from './components/RentalMap';
import EditRental from './components/EditRental';
import AddRental from './components/AddRental';
import RenterMap from './components/RenterMap';
import styled from 'styled-components';
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

	const NavigationBar = styled.nav`
		width: 100%;
		height: 5rem;
		font-size: 1.5rem;
		background-color: white;
		flex-direction: row;
		align-items: center;
		position: fixed;
		top: 0;
		border-bottom: 1px solid lightgrey;
	`;

	const ListItem = styled.li`
		text-decoration: none;
		color: black;
		margin: auto;
	`;

	const LogoDiv = styled.div`
		flex-grow: 0.5;
	`;

	return (
		<div className='App'>
			<RentContext.Provider value={{ rental, setRental }}>
				<Router>
					<NavigationBar>
						<ul className='TopLinks'>
							<LogoDiv>
								<p>Use My Tech Stuff</p>
							</LogoDiv>
							<ListItem>
								<Link className='ListLinks' to='/'>
									Login
								</Link>
							</ListItem>
							<ListItem>
								<Link className='ListLinks' to='/rental'>
									Dashboard
								</Link>
							</ListItem>
							<ListItem>
								<Link className='ListLinks' to='/add'>
									Add Rental
								</Link>
							</ListItem>
							<ListItem>
								<Link onClick={Logout} className='ListLinks' to='/logout'>
									Logout
								</Link>
							</ListItem>
						</ul>
					</NavigationBar>
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
