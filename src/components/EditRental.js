import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import RentContext from '../contexts/RentContext';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// styled-components
const FormHeading = styled.h1 `
    margin-top: 40px;
    margin-bottom: 20px;
    color: black;
    display: flex;
    justify-content: center;
`;

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

const FormContainer = styled.div`
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
// end styled-components


const EditRental = ({ history, match }) => {

    const { rental, setRental } = useContext(RentContext);

    console.log('here is the match object', match.params.id);

    const [editRental, setEditRental] = useState(
        {
            product_type: '',
            product_model: '',
            product_description: '',
            rental_price: '',
        }
    );

    useEffect(() => {
        axiosWithAuth()
            .get(`/products/${match.params.id}`)
            .then(res=> {
                console.log('here is the get from EditRental', res.data);
                setEditRental(res.data);
            })
            .catch(err => console.log('Did not get rental from EditRental', err));

    }, [match.params.id]);

    const handleChange = event => {

        setEditRental({ ...editRental, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axiosWithAuth()
            .put(`/products/${match.params.id}`, editRental)
            .then(res => {
                console.log('this is post response for editRental', res);
                setEditRental({
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
        
            <FormContainer>
                <FormHeading>Edit Rental Information</FormHeading>
                <FormSetup onSubmit={handleSubmit}>
                    <label htmlFor='product_type'>Technology Type</label>
                    <EnterInput
                        id='product_type'
                        type='text'
                        name='product_type'
                        placeholder='Enter Type'
                        onChange={handleChange}
                        value={editRental.product_type}
                    />
                    <label htmlFor='product_model'>Model</label>
                    <EnterInput
                        id='product_model'
                        type='text'
                        name='product_model'
                        placeholder='Enter Model'
                        onChange={handleChange}
                        value={editRental.product_model}
                    />
                    <label htmlFor='product_description'>Description</label>
                    <EnterInput
                        id='product_description'
                        type='text'
                        name='product_description'
                        placeholder='Enter Description'
                        onChange={handleChange}
                        value={editRental.product_description}
                    />
                    <label htmlFor='rental_price'>Rental Price</label>
                    <EnterInput
                        id='rental_price'
                        type='text'
                        name='rental_price'
                        placeholder='Enter Rental Price'
                        onChange={handleChange}
                        value={editRental.rental_price}
                    />
                    <SubmitButton type='submit'>Update Information</SubmitButton>
                </FormSetup>
            </FormContainer>
        </div>
    )
};
export default EditRental;
