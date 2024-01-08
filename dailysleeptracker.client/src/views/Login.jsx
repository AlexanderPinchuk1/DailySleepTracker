import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PasswordVisabilityImage from '../components/image/PasswordVisabilityImage';
import FormWrapper from '../components/containers/FormWrapper';
import Errors from '../components/containers/Errors';
import UserDataInput from '../components/input/UserDataInput';
import OrangeButton from '../components/button/OrangeButton';
import UserInputLabel from '../components/label/UserInputLabel';
import styled from 'styled-components';
import { getTokenFromServerAsync, getTokenFromLocalStorage } from '../api/tokenAPI'

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

const Login = () => {
    const navigate = useNavigate();
    const [passwordInputType, setPasswordInputType] = useState("password");
    const [user, setUser] = useState({
        email: "",
        password: "",
        errors: {
            email: "",
            password: ""
        },
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
                    '' : 'Email is invalid!';
                break;
            case 'password':
                errors.password = value.length >= 6 ?
                    '' : 'Password is too short!';
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

    const SignInIfNoErrorsAsync = async () => {
        updateErrorField('email', user.email);
        updateErrorField('password', user.password);

        if (user.errors.email !== "" ||
            user.errors.password !== "") {
            return;
        }

        const data = await getTokenFromServerAsync(user);

        if (data.access_token !== undefined) {
            navigate("/statistics");
        } else {
            setUser({
                ...user,
                errors: data,
            });
        }
    };

    return (
        <FormWrapper header="Sign in" >
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

            <ErrorsContainer>
                <Errors errors={user.errors} />
            </ErrorsContainer>
            
            <ButtonContainer>
                <OrangeButton onClick={async () => await SignInIfNoErrorsAsync()}>
                    Sign in
                </OrangeButton>
            </ButtonContainer>

            <ButtonContainer>
                <OrangeButton onClick={() => navigate('/register')}>
                    Don't have an account? Sign up
                </OrangeButton>
            </ButtonContainer>
        </FormWrapper>
    )
}

export default Login;