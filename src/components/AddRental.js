import React, { useState, useContext } from 'react';
import RentContext from '../contexts/RentContext';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// styled-components
const FormSetup = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 40px;
`;

const EnterInput = styled.input`
	margin-top: 1rem;
	margin-bottom: 1rem;
	padding: 0.5rem 1rem;
	border-radius: 25px;
`;

const SubmitButton = styled.button`
	margin-top: 30px;
`;
// end styled-components

const AddRental = ({ history, match }) => {
	const { rental, setRental } = useContext(RentContext);

	const [addRental, setAddRental] = useState({
		product_type: '',
		product_model: '',
		product_description: '',
		rental_price: ''
	});

	const handleChange = event => {
		setAddRental({ ...addRental, [event.target.name]: event.target.value });
	};

	const handleSubmit = event => {
		event.preventDefault();
		axiosWithAuth()
			.post('/products', addRental)
			.then(res => {
				console.log('this is post response for AddRental', res);
				console.log('add rental', addRental);
				setAddRental({
					owner_id: '',
					product_type: '',
					product_model: '',
					product_description: '',
					rental_price: ''
				});
				setRental([...rental, res]);
				history.push('/rental');
			});
	};

	const AddRentalFormContainer = styled.div`
		margin-top: 8rem;
	`;

	return (
		<AddRentalFormContainer>
			<FormSetup onSubmit={handleSubmit}>
				<label htmlFor='product_type'>Technology Type</label>
				<EnterInput
					id='product_type'
					type='text'
					name='product_type'
					placeholder='Enter Type'
					onChange={handleChange}
					value={addRental.product_type}
				/>
				<label htmlFor='product_model'>Model</label>
				<EnterInput
					id='product_model'
					type='text'
					name='product_model'
					placeholder='Enter Model'
					onChange={handleChange}
					value={addRental.product_model}
				/>
				<label htmlFor='product_description'>Description</label>
				<EnterInput
					id='product_description'
					type='text'
					name='product_description'
					placeholder='Enter Description'
					onChange={handleChange}
					value={addRental.product_description}
				/>
				<label htmlFor='rental_price'>Rental Price</label>
				<EnterInput
					id='rental_price'
					type='text'
					name='rental_price'
					placeholder='Enter Rental Price'
					onChange={handleChange}
					value={addRental.rental_price}
				/>
				<SubmitButton type='submit'>Add Rental</SubmitButton>
			</FormSetup>
		</AddRentalFormContainer>
	);
};
export default AddRental;
