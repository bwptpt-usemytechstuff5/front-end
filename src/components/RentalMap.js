import React, { useContext, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
import RentContext from '../contexts/RentContext';
import Rental from './Rental';

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

	const RentalMap = styled.div`
		margin-top: 8rem;
	`;

	return (
		<RentalMap>
			{rental.map(item => {
				return <Rental key={item.id} history={history} item={item} />;
			})}
		</RentalMap>
	);
};
export default RentalMap;
