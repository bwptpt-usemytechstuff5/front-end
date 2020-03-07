import React, { useContext, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import styled from 'styled-components';
import RentContext from '../contexts/RentContext';
import Renter from './Renter';


const Title = styled.h1`
	color: black;
	display: flex;
	justify-content: center;
`;

const RenterStyle = styled.div`
		margin-top: 8rem;
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

	const ListItem = styled.li`
		text-decoration: none;
		color: black;
		margin: auto;
	`;

	const LogoDiv = styled.div`
		flex-grow: 0.5;
	`;


const RenterMap = () => {
	const { rental, setRental } = useContext(RentContext);

	useEffect(() => {
		axiosWithAuth()
			.get('/products')
			.then(res => {
				console.log('Here are the available rental items', res.data);
				setRental(res.data);
			})
			.catch(err => console.log('Did not get list of renter items', err));
	}, [setRental]);

	return (
		<div>
			<NavigationBar>
					<ul className='TopLinks'>
						<LogoDiv>
							<p>Use My Tech Stuff</p>
						</LogoDiv>
						<ListItem>
							<Link className='ListLinks' to='/renter'>
								Dashboard
							</Link>
						</ListItem>
						<ListItem>
							<Link onClick={Logout} className='ListLinks' to='/logout'>
								Logout
							</Link>
						</ListItem>
					</ul>
				</NavigationBar>
				<RenterStyle>
				<Title>Available Items for Rent</Title>
					{rental.map(item => {
						return <Renter key={item.id} item={item} />;
					})}
				</RenterStyle>
		</div>
	);
};
export default RenterMap;
