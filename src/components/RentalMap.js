import React, { useContext, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import RentContext from '../contexts/RentContext';
import Rental from './Rental';

const RentalMap = ({ history }) => {

    const { rental, setRental } = useContext(RentContext);
    console.log('this is history from map', history);

    useEffect(() => {
        axiosWithAuth()
        .get('/rental')
        .then(res => {
            console.log('Here are the owner rental items', res.data);
            setRental(res.data);
        })
        .catch(err => console.log('Did not get list of owner rental items', err))

    }, [setRental]);

    return (
        <div>
            <h2>My Items For Rent</h2>
            {rental.map(item => {
                return <Rental key={item.id} history={history} item={item} />
            })}
        </div>
    );
};
export default RentalMap;
