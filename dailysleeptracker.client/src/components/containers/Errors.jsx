import { React } from 'react';
import styled from 'styled-components';

const StyledErrors = styled.div`
    color: red;
    text-align: left;
    line-height: 1.0;
    font-size: 12px;
    width: 100%;
`

const Errors = ({ errors }) => {
    return (
        <StyledErrors>
            {Object.values(errors).some((value) => value !== "" ) === true
                    ?
                        <ul>
                            {Object.keys(errors).map((fieldName, i) => {
                                if (errors[fieldName].length > 0) {
                                    return (
                                        <li key={i}>{errors[fieldName]}</li>
                                    )
                                } else {
                                    return "";
                                }
                            })}
                        </ul>
                    : ""
                }
            </StyledErrors>
    )
}

export default Errors;
