import React from 'react';
//import { BrowserRouter as Link } from 'react-router-dom';
import styled from 'styled-components';

// styled-components
const Card = styled.div `
  border: solid black 2px;
  margin: 50px 250px 50px 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blue;
`;

const Name = styled.h1 `
  color: yellow;
  font-weight: bold;
`;

const Info = styled.ul `
  list-style-type: none;
`;

const ListItems = styled.li `
  color: white;
`;
// end styled-components


const Renter = ({ item }) => {
    
    return (
        <div>
            {/*<ul className='TopLinks'>
              <li>
                <Link className='ListLinks' to='/'>Login</Link>
              </li>
            </ul>*/}
            <Card>
              <Info>
                  <Name>Technology Type: {item.type}</Name>
                  <ListItems>Model: {item.model}</ListItems>
                  <ListItems>Description: {item.description}</ListItems>
                  <ListItems>Rental Price: {item.rentalPrice}</ListItems>
                  <ListItems>Date Posted: {item.datePosted}</ListItems>
              </Info>
            </Card>      
        </div>
    );
};
export default Renter;
