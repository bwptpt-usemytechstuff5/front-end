import React, { useContext, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import styled from 'styled-components';
import RentContext from '../contexts/RentContext';
import Rental from './Rental';

const RentalStyle = styled.div`
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

	const Title = styled.h1`
		color: black;
		display: flex;
		justify-content: center;
	`;

const RentalMap = ({ history }) => {
	const { rental, setRental } = useContext(RentContext);
	console.log('this is history from map', history);

	useEffect(() => {
		axiosWithAuth()
			.get('/products')
			.then(res => {
				console.log('Here are the owner rental items', res.data);
				setRental(res.data);
			})
			.catch(err => console.log('Did not get list of owner rental items', err));
	}, [setRental]);

	return (
		<div>
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
			<RentalStyle>
			<Title>My Items for Rent</Title>
				{rental.map(item => {
					return <Rental key={item.id} history={history} item={item} />;
				})}
			</RentalStyle>
		</div>
	);
};
export default RentalMap;
