import React, { useState } from 'react';
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

const LoginOld = ({ history }) => {

    const [userLogin, setUserLogin] = useState({
        username: '',
        password: ''
    })

    const handleChange = event => {

        setUserLogin({ ...userLogin, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axiosWithAuth()
            .post('/login', userLogin)
            .then(res => {
                console.log('Here is the response from the Login Post', res.data.payload);
                localStorage.setItem('token', res.data.payload);
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

    const handleRegister = event => {
        event.preventDefault();
        axiosWithAuth()
            .post('/register', userLogin)
            .then(res => {
                console.log('Here is the response from New Registration Post', res.data.payload);
                localStorage.setItem('token', res.data.payload);
                setUserLogin({
                    username: '',
                    password: ''
                })
                history.push('/renter');
            })
            .catch(err => {
                localStorage.removeItem('token');
                console.log('Invalid Registration username or password', err);
            })
    };

    return (
        <div>
            <FormHeading>Enter Login Credentials</FormHeading>
            <FormSetup onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <EnterInput
                    id='username'
                    type='text'
                    name='username'
                    placeholder='Enter Username'
                    onChange={handleChange}
                    value={userLogin.username}
                />
                <label htmlFor='password'>Password</label>
                <EnterInput
                    id='password'
                    type='password'
                    name='password'
                    placeholder='Enter Password'
                    onChange={handleChange}
                    value={userLogin.password}
                />
                <div className='LogInButton'>
                    <SubmitButton type='submit'>Log In</SubmitButton>
                    <SubmitButton onClick={handleRegister}>New Registration</SubmitButton>
                </div>
            </FormSetup>
        </div>
    )
}

export default LoginOld;