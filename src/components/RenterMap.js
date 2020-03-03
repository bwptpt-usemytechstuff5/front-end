import React, { useContext, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import RentContext from '../contexts/RentContext';
import Renter from './Renter';

const RenterMap = () => {

    const { rental, setRental } = useContext(RentContext);

    useEffect(() => {
        axiosWithAuth()
        .get('/products')
        .then(res => {
            console.log('Here are the available rental items', res.data);
            setRental(res.data);
        })
        .catch(err => console.log('Did not get list of renter items', err))

    }, [setRental]);

    return (
        <div>
            <h2>Available Items For Rent</h2>
            <ul className='TopLinks'>
              <li>
                <Link className='ListLinks' to='/renter'>Dashboard</Link>
              </li>
              <li>
                <Link onClick={Logout} className='ListLinks' to='/logout'>Logout</Link>
              </li>
            </ul>
            {rental.map(item => {
                return <Renter key={item.id} item={item} />
            })}
        </div>
    );
};
export default RenterMap;
