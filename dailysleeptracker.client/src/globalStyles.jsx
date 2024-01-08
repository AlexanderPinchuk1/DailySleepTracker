import { createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${props => (props.$light ? '#ffa50066' : 'orange')};
        font-family: "Comic Sans MS", cursive;
    }
`;

export default GlobalStyle;
