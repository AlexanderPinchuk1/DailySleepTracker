import { React } from 'react';
import styled from 'styled-components';

const StyledLightButton = styled.button`
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
    min-width: 150px;
    background-color: #f5f6f7;
    
    &:active {
        background-color: #e1e2e3;
    }

    &:hover {
        background-color: #e1e2e3;
    }
`

const LightButton = ({ children, ...props }) => {
    return (
        <StyledLightButton {...props}>
            {children}
        </StyledLightButton>
    );
};

export default LightButton 
