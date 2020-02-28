import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Login = () => {
	const { handleSubmit, register, errors } = useForm();
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

				<button type='submit'>Submit</button>
			</StyledForm>
		</FormWrapper>
	);
};
export default Login;
