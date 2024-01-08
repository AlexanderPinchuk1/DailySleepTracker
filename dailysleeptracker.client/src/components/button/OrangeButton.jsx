import { React } from 'react';
import styled from 'styled-components';

const StyledOrangeButton = styled.button`
    align-items: center;
    appearance: button;
    border-radius: 8px;
    border-style: none;
    box-shadow: rgba(255, 255, 255, 0.26) 0 1px 2px inset;
    box-sizing: border-box;
    color: black;
    cursor: pointer;
    flex-direction: row;
    font-weight: 500;
    font-size: 100%;
    line-height: 1.15;
    padding: 10px 15px;
    text-align: center;
    text-transform: none;
    transition: color .13s ease-in-out,background .13s ease-in-out,opacity .13s ease-in-out,box-shadow .13s ease-in-out;
    user-select: none;
    touch-action: manipulation;
    background-color: orange;

    &:active {
        background-color: lightgray;
    }

    &:hover {
        background-color: lightgray;
    }
`

const OrangeButton = ({ children, ...props }) => {
    return (
        <StyledOrangeButton {...props}>
            {children}
        </StyledOrangeButton>
    );
};

export default OrangeButton
