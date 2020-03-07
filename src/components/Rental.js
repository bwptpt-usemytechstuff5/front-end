import React, { useContext } from 'react';
import styled from 'styled-components';
import RentContext from '../contexts/RentContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';

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

const DeleteButton = styled.button `
    margin-left: 3%;
    background-color: yellow;
`

const EditButton = styled.button `
    margin-left: 3%;
    background-color: yellow;
`
// end styled-components


const Rental = ({ item, history }) => {

    console.log(history);
    const { rental, setRental } = useContext(RentContext);

    const handleDelete = id => {
        axiosWithAuth()
        .delete(`/products/${id}`)
        .then(res => {
            setRental(rental.filter(oldRental => oldRental.id !== id))
        })
    };

    const handleEdit = (id) => {
    console.log('here is the id:')
    console.log(`${id}`);
    history.push(`/rental/${id}`);
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
              <DeleteButton onClick={() => handleDelete(item.id)}>Remove Item</DeleteButton>
              <EditButton onClick={() => handleEdit(item.id)}>Edit Item</EditButton>
            </Card>      
        </div>
    );
};
export default Rental;
