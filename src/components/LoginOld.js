import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

// styled-components
const FormSetup = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 8rem;
	border: 1px solid green;
	width: 50%;
	border-radius: 25px;
`;

const EnterInput = styled.input`
	margin-top: 1rem;
	margin-bottom: 1rem;
	padding: 0.5rem 1rem;
	border-radius: 25px;
`;

const SubmitButton = styled.button`
	background-color: white;
	border: none;
`;

const ListItem = styled.li`
	text-decoration: none;
	color: black;
	margin: auto;
`;

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

const LogoDiv = styled.div`
	flex-grow: 0.5;
`;

// end styled-components

const LoginOld = ({ history }) => {
	const [userLogin, setUserLogin] = useState({
		username: '',
		password: ''
	});

	const handleChange = event => {
		setUserLogin({ ...userLogin, [event.target.name]: event.target.value });
	};

	const handleSubmit = event => {
		event.preventDefault();
		axiosWithAuth()
			.post('/login', userLogin)
			.then(res => {
				console.log(
					'Here is the response from the Login Post',
					res.data.payload
				);
				localStorage.setItem('token', res.data.payload);
				setUserLogin({
					username: '',
					password: ''
				});
				history.push('/rental');
			})
			.catch(err => {
				localStorage.removeItem('token');
				console.log('Invalid Owner username or password', err);
			});
	};

	const handleRegister = event => {
		event.preventDefault();
		axiosWithAuth()
			.post('/register', userLogin)
			.then(res => {
				console.log(
					'Here is the response from New Registration Post',
					res.data.payload
				);
				localStorage.setItem('token', res.data.payload);
				setUserLogin({
					username: '',
					password: ''
				});
				history.push('/renter');
			})
			.catch(err => {
				localStorage.removeItem('token');
				console.log('Invalid Registration username or password', err);
			});
	};

	const handleRenter = event => {
		event.preventDefault();
		axiosWithAuth()
			.post('/login', userLogin)
			.then(res => {
				console.log(
					'Here is the response from the Renter Login Post',
					res.data.payload
				);
				localStorage.setItem('token', res.data.payload);
				setUserLogin({
					username: '',
					password: ''
				});
				history.push('/renter');
			})
			.catch(err => {
				localStorage.removeItem('token');
				console.log('Invalid Renter username or password', err);
			});
	};

	return (
		<>
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

			<FormSetup onSubmit={handleSubmit}>
				<label htmlFor='username'>Username</label>
				<EnterInput
					id='username'
					type='text'
					name='username'
					placeholder='Enter Username'
					onChange={handleChange}
					value={userLogin.username}
				/>
				<label htmlFor='password'>Password</label>
				<EnterInput
					id='password'
					type='password'
					name='password'
					placeholder='Enter Password'
					onChange={handleChange}
					value={userLogin.password}
				/>
				<div className='LogInButton'>
					<SubmitButton type='submit'>Owner Log In</SubmitButton>
					<SubmitButton onClick={handleRenter}>Renter Log In</SubmitButton>
					<SubmitButton onClick={handleRegister}>New Registration</SubmitButton>
				</div>
			</FormSetup>
		</>
	);
};

export default LoginOld;
