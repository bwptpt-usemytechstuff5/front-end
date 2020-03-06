import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import RentContext from '../contexts/RentContext';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// styled-components
const FormHeading = styled.h2 `
    margin-top: 40px;
    margin-bottom: 20px;
`;

const FormSetup = styled.form `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`;

const EnterInput = styled.input `
    margin-top: 20px;
    margin-bottom: 20px;
`;

const SubmitButton = styled.button `
    margin-top: 30px;
`;
// end styled-components


const AddRental = ({ history, match }) => {

    const { rental, setRental } = useContext(RentContext);

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

    const handleSubmit = event => {
        event.preventDefault();
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
            <ul className='TopLinks'>
              <li>
                <Link className='ListLinks' to='/'>Login</Link>
              </li>
              <li>
                <Link className='ListLinks' to='/rental'>Dashboard</Link>
              </li>
              <li>
                <Link className='ListLinks' to='/add'>Add Rental</Link>
              </li>
              <li>
                <Link onClick={Logout} className='ListLinks' to='/logout'>Logout</Link>
              </li>
            </ul>
            <FormHeading>Add Rental Information</FormHeading>
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
        </div>
    );
};
export default AddRental;
