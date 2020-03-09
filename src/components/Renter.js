import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import styled from 'styled-components';

// styled-components
const Card = styled.div `
  border: solid green 2px;
  margin: 50px 350px 50px 350px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.h1 `
  color: blue;
  font-weight: bold;
`;

const Info = styled.ul `
  list-style-type: none;
`;

const ListItems = styled.li `
  color: black;
`;

const SelectButton = styled.button `
margin-left: 3%;
background-color: yellow;
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


const Renter = ({ item, history, cart, setCart }) => {

  const handleSelect = product => {
    console.log('this is item from renter', product);
    setCart(product);
    //history.push('/cart');
  }

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
                    <Link className='ListLinks' to='/cart'>
                      Cart
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link onClick={Logout} className='ListLinks' to='/logout'>
                      Logout
                    </Link>
                  </ListItem>
                </ul>
            </NavigationBar>
            <Card>
              <Info>
                  <Name>Technology Type: {item.product_type}</Name>
                  <ListItems>Model: {item.product_model}</ListItems>
                  <ListItems>Description: {item.product_description}</ListItems>
                  <ListItems>Rental Price: {item.rental_price}</ListItems>
              </Info>
              <SelectButton onClick={() => handleSelect(item)}>Add to Cart</SelectButton>
            </Card>      
        </div>
    );
};
export default Renter;
