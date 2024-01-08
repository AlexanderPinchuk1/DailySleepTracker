import { React } from 'react';
import styled from 'styled-components';

const StyledFormWrapper = styled.div`
    width: 320px;
    min-height: 400px;
    position: absolute;
    top: 32%;
    left: 50%;
    margin: -160px 0 0 -160px;
    padding: 15px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    .icon {
        margin: 20px 30px 20px 30px;
    }
`

const FormWrapper = ({children, header}) => {
    return (
        <StyledFormWrapper>
            <img alt="icon" src="./images/key.png" className="icon" />
            <h3>{header}</h3>
            {children}
        </StyledFormWrapper>
    );
}

export default FormWrapper;
