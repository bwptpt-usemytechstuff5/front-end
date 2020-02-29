import React, { useContext } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import styled from 'styled-components';
import RentContext from '../contexts/RentContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';

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
        .delete(`/rental/${id}`)
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
            <ul className='TopLinks'>
              <li>
                <Link className='ListLinks' to='/'>Login</Link>
              </li>
              <li>
                <Link className='ListLinks' to='/add'>Add Rental</Link>
              </li>
           </ul>
            <Card>
              <Info>
                  <Name>Technology Type: {item.type}</Name>
                  <ListItems>Model: {item.model}</ListItems>
                  <ListItems>Description: {item.description}</ListItems>
                  <ListItems>Rental Price: {item.rentalPrice}</ListItems>
                  <ListItems>Date Posted: {item.datePosted}</ListItems>
              </Info>
              <DeleteButton onClick={() => handleDelete(item.id)}>Remove Item</DeleteButton>
              <EditButton onClick={() => handleEdit(item.id)}>Edit Item</EditButton>
            </Card>      
        </div>
    );
};
export default Rental;
