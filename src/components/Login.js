import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import { useForm } from 'react-hook-form';
import Logout from './Logout';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

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

const Login = ({ history }) => {

    const [userLogin, setUserLogin] = useState({
        username: '',
        password: ''
    })

    //const { register, handleSubmit, errors } = useForm();

    const handleChange = event => {

        setUserLogin({ ...userLogin, [event.target.name]: event.target.value });
    };

    const submitHandle = event => {
        event.preventDefault();
        axiosWithAuth()
            .post('/login', userLogin)
            .then(res => {
                console.log('Here is the response from the Login Post', res.data.token);
                localStorage.setItem('token', res.data.token);
                setUserLogin({
                    username: '',
                    password: ''
                })
                history.push('/rental');
            })
            .catch(err => {
                localStorage.removeItem('token');
                console.log('Invalid Owner username or password', err);
            })
    };

/*    const handleOwnerRegister = event => {
        event.preventDefault();
        axiosWithAuth()
            .post('/register', userLogin)
            .then(res => {
                console.log('Here is the response from New Registration Post', res.data.token);
                localStorage.setItem('token', res.data.token);
                setUserLogin({
                    username: '',
                    password: ''
                })
                history.push('/rental');
            })
            .catch(err => {
                localStorage.removeItem('token');
                console.log('Invalid Owner Registration username or password', err);
            })
    };
*/

    const handleRegister = event => {
        event.preventDefault();
        axiosWithAuth()
            .post('/register', userLogin)
            .then(res => {
                console.log('Here is the response from New Registration Post', res.data.token);
                localStorage.setItem('token', res.data.token);
                setUserLogin({
                    username: '',
                    password: ''
                })
                history.push('/renter');
            })
            .catch(err => {
                localStorage.removeItem('token');
                console.log('Invalid Renter Registration username or password', err);
            })
    };

    const handleRenter = event => {
        event.preventDefault();
        axiosWithAuth()
            .post('/login', userLogin)
            .then(res => {
                console.log('Here is the response from the Renter Login Post', res.data.token);
                localStorage.setItem('token', res.data.token);
                setUserLogin({
                    username: '',
                    password: ''
                })
                history.push('/renter');
            })
            .catch(err => {
                localStorage.removeItem('token');
                console.log('Invalid Renter username or password', err);
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
            <FormHeading>Enter Login Credentials</FormHeading>
      {/*      <FormSetup onSubmit={handleSubmit(submitHandle)}> */}
                <FormSetup onSubmit={submitHandle}>
                <label htmlFor='username'>Username</label>
                <EnterInput
                    id='username'
                    type='text'
                    name='username'
                    placeholder='Minimum 5 Characters'
                    onChange={handleChange}
                    value={userLogin.username}
                />
                
                <label htmlFor='password'>Password</label>
                <EnterInput
                    id='password'
                    type='password'
                    name='password'
                    placeholder='Minimum 5 Characters'
                    onChange={handleChange}
                    value={userLogin.password}
        
                />
                
                <div className='LogInButton'>
                    <SubmitButton type='submit'>Owner Log In</SubmitButton>
                    {/*<SubmitButton onClick={handleOwnerRegister}>New Owner Registration</SubmitButton>*/}
                    <SubmitButton onClick={handleRenter}>Renter Log In</SubmitButton>
                    <SubmitButton onClick={handleRegister}>New Renter Registration</SubmitButton>
                </div>
            </FormSetup>
        </div>
    )
}

export default Login;
