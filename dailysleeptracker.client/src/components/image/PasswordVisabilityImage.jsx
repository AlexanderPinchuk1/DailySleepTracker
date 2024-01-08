import { React } from 'react';
import styled from 'styled-components';

const StyledPasswordVisabilityImage = styled.img`
    position: absolute;
    top: 12px;
    right: 45px;
    display: inline-block;
    width: 22px;
    height: 22px;
    cursor: pointer;
`

const PasswordVisabilityImage = (props) => {
    return (
        <StyledPasswordVisabilityImage  {...props} />
    );
};

export default PasswordVisabilityImage 