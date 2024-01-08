import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FormWrapper from '../components/containers/FormWrapper';
import UserDataInput from '../components/input/UserDataInput';
import PasswordVisabilityImage from '../components/image/PasswordVisabilityImage';
import Errors from '../components/containers/Errors'
import OrangeButton from '../components/button/OrangeButton';
import UserInputLabel from '../components/label/UserInputLabel';
import styled from 'styled-components';
import { createUserAsync } from '../api/userAPI';

const ButtonContainer = styled.div`
    width: 100%;
    margin: 10px 0 10px 0;
    padding: 0 30px 0 30px;
`

const InputContainer = styled.div`
    width: 100%;
    position: relative;
    margin: 20px 0 20px 0;
    padding: 0 30px 0 30px;
`

const ErrorsContainer = styled.div`
    width: 100%;
    padding: 0 30px 0 20px;
`

const Register = () => {
    const navigate = useNavigate();
    const [passwordInputType, setPasswordInputType] = useState("password");
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        errors: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const handleUserInput = (event) => {
        const name = event.target.id;
        const value = event.target.value;

        setUser({
            ...user,
            errors: validateField(name, value),
            [name]: value
        });
    }

    const validateField = (fieldName, value) => {
        let errors = user.errors;

        switch (fieldName) {
            case 'email':
                errors.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ?
                    '' : 'Email is invalid';
                break;
            case 'password':
                errors.password = value.length >= 6 ?
                    '' : 'Password is too short';
                break;
            case 'confirmPassword':
                errors.confirmPassword = value === user.password ?
                    '' : "Confirm password isn't match the password";
                break;
            default:
                break;
        }

        return errors;
    }

    const updateErrorField = (fieldName, value) => {
        setUser({
            ...user,
            errors: validateField(fieldName, value),
        });
    }

    const SignUpIfNoErrorsAsync = async () => {
        updateErrorField('email', user.email);
        updateErrorField('password', user.password);
        updateErrorField('confirmPassword', user.password);

        if (user.errors.email !== "" ||
            user.errors.password !== "" ||
            user.errors.confirmPassword !== "") {
            return;
        }

        const response = await createUserAsync(user);
        
        if (response.ok === true) {
            navigate("/login");
        } else {
            setUser({
                ...user,
                errors: await response.json(),
            });
        }
    };

    return (
        <FormWrapper header="Sign up" >
            <InputContainer>
                <UserInputLabel htmlFor="email">
                    Email
                </UserInputLabel>
                <UserDataInput
                    value={user.email}
                    type="email"
                    id="email"
                    onChange={(event) => handleUserInput(event)}
                />
            </InputContainer>

            <InputContainer>
                <UserInputLabel htmlFor="password">
                    Password
                </UserInputLabel>
                <UserDataInput
                    value={user.password}
                    type={passwordInputType}
                    id="password"
                    onChange={(event) => handleUserInput(event)}
                />

                {(passwordInputType === "password")
                    ? <PasswordVisabilityImage
                        src="/images/no-view.svg"
                        onClick={() => setPasswordInputType("text")} />
                    : <PasswordVisabilityImage
                        src="/images/view.svg"
                        onClick={() => setPasswordInputType("password")} />
                }
            </InputContainer>

            <InputContainer>
                <UserInputLabel htmlFor="confirmPassword">
                    Confirm password
                </UserInputLabel>
                <UserDataInput
                    value={user.confirmPassword}
                    type="password"
                    id="confirmPassword"
                    onChange={(event) => handleUserInput(event)}
                />
            </InputContainer>

            <ErrorsContainer>
                <Errors errors={user.errors} />
            </ErrorsContainer>

            <ButtonContainer>
                <OrangeButton onClick={() => SignUpIfNoErrorsAsync()}>
                    Sign up
                </OrangeButton>
            </ButtonContainer>
            <ButtonContainer>
                <OrangeButton onClick={() => navigate('/login')}>
                    Already have an account? Sign in
                </OrangeButton>
            </ButtonContainer>
        </FormWrapper>
    )
}

export default Register;