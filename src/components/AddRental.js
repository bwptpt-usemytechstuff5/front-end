import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Logout from './Logout';
import RentContext from '../contexts/RentContext';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// styled-components
const FormSetup = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	border: 1px solid green;
	width: 50%;
	border-radius: 25px;
	padding: 3rem 0;
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
    
    const AddRentalFormContainer = styled.div`
		margin-top: 8rem;
    `;
    
    const Title = styled.h1 `
        color: black;
        display: flex;
        justify-content: center;
    `
// end styled-components

const AddRental = ({ history, match }) => {

    const { rental, setRental } = useContext(RentContext);

    const { register, handleSubmit, errors } = useForm();

    const [addRental, setAddRental] = useState(
        {
            product_type: '',
            product_model: '',
            product_description: '',
            rental_price: '',
        }
    );

	const handleChange = event => {
		setAddRental({ ...addRental, [event.target.name]: event.target.value });
	};
/*
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
*/
    const submitForm = event => {
        //event.preventDefault();
        axiosWithAuth()
            .post('/products', addRental)
            .then(res => {
                console.log('this is post response for AddRental', res);
                console.log("add rental", addRental);
                setAddRental({
                    owner_id: '',
                    product_type: '',
                    product_model: '',
                    product_description: '',
                    rental_price: '',
                })
                setRental([...rental, res])
                history.push('/rental');
            })
    };

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
            {/*<FormHeading>Add Rental Information</FormHeading>*/}
            <AddRentalFormContainer>
                <Title>Add Items for Rent</Title>
                <FormSetup onSubmit={handleSubmit(submitForm)}>
                    <label htmlFor='product_type'>Technology Type</label>
                    <EnterInput
                        id='product_type'
                        type='text'
                        name='product_type'
                        placeholder='Enter Type'
                        onChange={handleChange}
                        value={addRental.product_type}
                        ref={register({ required: true })}
                    />
                    {errors.product_type && errors.product_type.type === 'required' && (
                        <p>This is required</p>
                    )}
                    <label htmlFor='product_model'>Model</label>
                    <EnterInput
                        id='product_model'
                        type='text'
                        name='product_model'
                        placeholder='Enter Model'
                        onChange={handleChange}
                        value={addRental.product_model}
                        ref={register({ required: true })}
                    />
                    {errors.product_model && errors.product_model.type === 'required' && (
                        <p>This is required</p>
                    )}
                    <label htmlFor='product_description'>Description</label>
                    <EnterInput
                        id='product_description'
                        type='text'
                        name='product_description'
                        placeholder='Enter Description'
                        onChange={handleChange}
                        value={addRental.product_description}
                        ref={register({ required: true })}
                    />
                    {errors.product_description && errors.product_description.type === 'required' && (
                        <p>This is required</p>
                    )}
                    <label htmlFor='rental_price'>Rental Price</label>
                    <EnterInput
                        id='rental_price'
                        type='text'
                        name='rental_price'
                        placeholder='Enter Rental Price'
                        onChange={handleChange}
                        value={addRental.rental_price}
                        ref={register({ required: true })}
                    />
                    {errors.rental_price && errors.rental_price.type === 'required' && (
                        <p>This is required</p>
                    )}
                    <SubmitButton type='submit'>Add Rental</SubmitButton>
                </FormSetup>
            </AddRentalFormContainer>
        </div>
    );
};
export default AddRental;
