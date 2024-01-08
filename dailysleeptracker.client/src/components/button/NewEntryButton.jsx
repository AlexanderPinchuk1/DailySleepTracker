import { React } from 'react';
import styled from 'styled-components';

const StyledNewEntryButton = styled.button`
    border-radius: 30px;
    min-width: 160px;
    width: 100%;
    border: 0px;
    color: white;
    background-color: orange;

    &:active {
        background-color: #e1e2e3;
    }

    &:hover {
        background-color: #e1e2e3;
    }

    img{
        width: 30px;
        height: 30px;
        margin: 10px;
    }
`

const NewEntryButton = ({ children, ...props }) => {
    return (
        <StyledNewEntryButton {...props}>
            <img src="./images/plus.png" alt=""></img>
            { children }
        </StyledNewEntryButton>
    );
};

export default NewEntryButton
