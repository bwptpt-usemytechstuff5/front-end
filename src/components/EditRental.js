import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
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


const EditRental = ({ history, match }) => {

    const { rental, setRental } = useContext(RentContext);

    console.log('here is the match object', match.params.id);

    const [editRental, setEditRental] = useState(
        {
            id: '',
            type: '',
            model: '',
            description: '',
            rentalPrice: '',
            datePosted: ''
        }
    );

    useEffect(() => {
        axiosWithAuth()
            .get(`/rental/${match.params.id}`)
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
            .put(`/rental/${match.params.id}`, editRental)
            .then(res => {
                console.log('this is post response for editRental', res);
                setEditRental({
                    id: '',
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
                <Link className='ListLinks' to='/rental'>My Available Rentals</Link>
              </li>
              <li>
                <Link className='ListLinks' to='/add'>Add Rental</Link>
              </li>
           </ul>
            <FormHeading>Edit Rental Information</FormHeading>
            <FormSetup onSubmit={handleSubmit}>
                <label htmlFor='type'>Technology Type</label>
                <EnterInput
                    id='type'
                    type='text'
                    name='type'
                    placeholder='Enter Type'
                    onChange={handleChange}
                    value={editRental.type}
                />
                <label htmlFor='model'>Model</label>
                <EnterInput
                    id='model'
                    type='text'
                    name='model'
                    placeholder='Enter Model'
                    onChange={handleChange}
                    value={editRental.model}
                />
                <label htmlFor='description'>Description</label>
                <EnterInput
                    id='description'
                    type='text'
                    name='description'
                    placeholder='Enter Description'
                    onChange={handleChange}
                    value={editRental.description}
                />
                <label htmlFor='rentalPrice'>Rental Price</label>
                <EnterInput
                    id='rentalPrice'
                    type='text'
                    name='rentalPrice'
                    placeholder='Enter Rental Price'
                    onChange={handleChange}
                    value={editRental.rentalPrice}
                />
                <label htmlFor='datePosted'>Date Posted</label>
                <EnterInput
                    id='datePosted'
                    type='text'
                    name='datePosted'
                    placeholder='Enter Date Posted'
                    onChange={handleChange}
                    value={editRental.datePosted}
                />
                <SubmitButton type='submit'>Update Information</SubmitButton>
            </FormSetup>
        </div>
    )
};
export default EditRental;
