import React, { useContext, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import RentContext from '../contexts/RentContext';
import Rental from './Rental';

const RentalMap = ({ history }) => {

    const { rental, setRental } = useContext(RentContext);
    console.log('this is history from map', history);

    useEffect(() => {
        axiosWithAuth()
        .get('/products')
        .then(res => {
            console.log('Here are the owner rental items', res.data);
            setRental(res.data);
        })
        .catch(err => console.log('Did not get list of owner rental items', err))

    }, [setRental]);

    return (
        <div>
            <h2>My Items For Rent</h2>
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
            {rental.map(item => {
                return <Rental key={item.id} history={history} item={item} />
            })}
        </div>
    );
};
export default RentalMap;
