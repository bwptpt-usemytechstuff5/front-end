import React from 'react';
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

const SelectButton = styled.button `
margin-left: 3%;
background-color: yellow;
`;
// end styled-components


const Renter = ({ item }) => {
  
  const handleSelect = product => {
    alert(`${product} request sucessfully sent`);
  }

    return (
        <div>
            <Card>
              <Info>
                  <Name>Technology Type: {item.product_type}</Name>
                  <ListItems>Model: {item.product_model}</ListItems>
                  <ListItems>Description: {item.product_description}</ListItems>
                  <ListItems>Rental Price: {item.rental_price}</ListItems>
              </Info>
              <SelectButton onClick={() => handleSelect(item.product_type)}>Rent Now</SelectButton>
            </Card>      
        </div>
    );
};
export default Renter;
