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


const AddRental = ({ history }) => {

    const { rental, setRental } = useContext(RentContext);

    const [addRental, setAddRental] = useState(
        {
            id: Math.random(),
            type: '',
            model: '',
            description: '',
            rentalPrice: '',
            datePosted: ''
        }
    );

    const handleChange = event => {

        setAddRental({ ...addRental, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axiosWithAuth()
            .post('/rental', addRental)
            .then(res => {
                console.log('this is post response for AddRental', res);
                setAddRental({
                    type: '',
                    model: '',
                    description: '',
                    rentalPrice: '',
                    datePosted: ''
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
                <label htmlFor='type'>Technology Type</label>
                <EnterInput
                    id='type'
                    type='text'
                    name='type'
                    placeholder='Enter Type'
                    onChange={handleChange}
                    value={addRental.type}
                />
                <label htmlFor='model'>Model</label>
                <EnterInput
                    id='model'
                    type='text'
                    name='model'
                    placeholder='Enter Model'
                    onChange={handleChange}
                    value={addRental.model}
                />
                <label htmlFor='description'>Description</label>
                <EnterInput
                    id='description'
                    type='text'
                    name='description'
                    placeholder='Enter Description'
                    onChange={handleChange}
                    value={addRental.description}
                />
                <label htmlFor='rentalPrice'>Rental Price</label>
                <EnterInput
                    id='rentalPrice'
                    type='text'
                    name='rentalPrice'
                    placeholder='Enter Rental Price'
                    onChange={handleChange}
                    value={addRental.rentalPrice}
                />
                <label htmlFor='datePosted'>Date Posted</label>
                <EnterInput
                    id='datePosted'
                    type='text'
                    name='datePosted'
                    placeholder='Enter Date Posted'
                    onChange={handleChange}
                    value={addRental.datePosted}
                />
                <SubmitButton type='submit'>Add Rental</SubmitButton>
            </FormSetup>
        </div>
    );
};
export default AddRental;
