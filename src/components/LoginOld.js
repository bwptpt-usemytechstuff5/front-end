import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const LoginOld = () => {
	// form state to check if the user is trying to register or login
	const [registerNewUser, setRegisterNewUser] = useState(false);

	// form structural components
	const { handleSubmit, register, errors } = useForm();

	// helper functions
	const onSubmit = values => {
		console.log(values);
	};

	// styled components
	const FormWrapper = styled.section`
		width: 75vw;
	`;

	const StyledForm = styled.form``;

	return (
		<FormWrapper>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				{/* eMail */}
				<input
					name='email'
					ref={register({
						required: 'Required',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							message: 'invalid email address'
						}
					})}
				/>
				{errors.email && errors.email.message}

				{/* username */}
				<input
					name='username'
					ref={register({
						validate: value => value !== 'admin' || 'Nice try!'
					})}
				/>
				{errors.username && errors.username.message}

				{/* 
                if this person is trying to register a new 
                user then render a password input field as well 
                */}
				{registerNewUser === true ? (
					<input
						name='password'
						ref={register({
							validate: value => value > 8 || 'Password must be longer then 8'
						})}
					/>
				) : null}
				{errors.username && errors.username.message}

				<button type='submit'>Submit</button>
			</StyledForm>
		</FormWrapper>
	);
};
export default LoginOld;
