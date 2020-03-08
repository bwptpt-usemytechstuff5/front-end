import React, { useContext } from 'react';
import CartContext from '../contexts/CartContext';
import RentContext from '../contexts/RentContext'
import Logout from './Logout';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import '../App.css';
import styled from 'styled-components';

const Name = styled.h1 `
  color: blue;
  font-weight: bold;
`;

const Info = styled.ul `
  list-style-type: none;
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

	const ListItems = styled.li`
		text-decoration: none;
		color: black;
		margin: auto;
	`;

    const ListItem = styled.li`
		text-decoration: none;
		color: black;
		margin: auto;
	`;

	const LogoDiv = styled.div`
		flex-grow: 0.5;
	`;

const Cart = ({ history }) => {
    
    const { cart } = useContext(CartContext);
    const { rental, setRental } = useContext(RentContext);

    const handleDash = (id, product) => {
        console.log('this is handleDash ID', id);
        axiosWithAuth()
            .delete(`/products/${id}`)
            .then(res => {
                setRental(rental.filter(oldRental => oldRental.id !== id));
            })
            history.push('/renter');
            alert(`${product} sucessfully rented`);
    };

    const handleLogout = (id, product) => {
        axiosWithAuth()
            .delete(`/products/${id}`)
            .then(res => {
                setRental(rental.filter(oldRental => oldRental.id !== id));
            })
            history.push('/');
            alert(`${product} sucessfully rented`);
    };
    
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
            <FormContainer>
                <FormSetup>
                    <h1>Rental Cart</h1>
                    <Info>
                        <Name>Technology Type: {cart.product_type}</Name>
                        <ListItems>Model: {cart.product_model}</ListItems>
                        <ListItems>Description: {cart.product_description}</ListItems>
                        <ListItems>Rental Price: {cart.rental_price}</ListItems>
                    </Info>
                    <div>
                        <SubmitButton onClick={() => handleDash(cart.id, cart.product_type)}>Checkout/Add More Items</SubmitButton>
                        <SubmitButton onClick={() => handleLogout(cart.id, cart.product_type)}>Checkout/Logout</SubmitButton>
                    </div>
                </FormSetup>
            </FormContainer>
        </div>
    )
}
export default Cart;
