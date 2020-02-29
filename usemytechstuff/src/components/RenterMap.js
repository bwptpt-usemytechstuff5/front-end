import React, { useContext, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import RentContext from '../contexts/RentContext';
import Renter from './Renter';

const RenterMap = () => {

    const { rental, setRental } = useContext(RentContext);

    useEffect(() => {
        axiosWithAuth()
        .get('/rental')
        .then(res => {
            console.log('Here are the available rental items', res.data);
            setRental(res.data);
        })
        .catch(err => console.log('Did not get list of renter items', err))

    }, [setRental]);

    return (
        <div>
            <h2>Available Items For Rent</h2>
            {rental.map(item => {
                return <Renter key={item.id} item={item} />
            })}
        </div>
    );
};
export default RenterMap;
