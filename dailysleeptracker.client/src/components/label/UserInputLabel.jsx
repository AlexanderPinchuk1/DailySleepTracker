import { React } from 'react';
import styled from 'styled-components';

const StyledUserInputLabel = styled.label`
    transform: scale(0.85) translateY(-24px);
    top: 0px;
    left: 0px;
    z-index: 2;
    position: absolute;
    transform-origin: left top;
    margin-top: 9px;
    padding: 0 3px 0 3px;
    margin-inline-start: 43px;
    background-color: white;
    font-weight: 500;
`

const UserInputLabel = ({ children, ...props }) => {
    return (
        <StyledUserInputLabel {...props}>
            {children}
        </StyledUserInputLabel>
    );
};

export default UserInputLabel