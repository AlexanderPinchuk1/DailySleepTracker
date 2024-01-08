import { React } from 'react';
import styled from 'styled-components';

const StyledUserDataInput = styled.input`
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid lightgray;
    border-radius: 4px;
    padding: 12px 10px 8px 10px;
`

const UserDataInput = (props) => {
    return (
        <StyledUserDataInput {...props} />
    );
};

export default UserDataInput
