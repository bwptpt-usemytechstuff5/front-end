import React, { useContext, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';
import RentContext from '../contexts/RentContext';
import Renter from './Renter';

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

	const RenterMap = styled.div`
		margin-top: 8rem;
	`;

	return (
		<RenterMap>
			{rental.map(item => {
				return <Renter key={item.id} item={item} />;
			})}
		</RenterMap>
	);
};
export default RenterMap;
