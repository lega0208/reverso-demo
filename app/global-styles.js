import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  table#data-table > tbody > {
    tr:hover {
      cursor: pointer;
    };
    tr.selected-tr {
      background-color: rgba(0, 122, 255, 0.39);
    }
  }
  #details-modal {
    max-width: 68vw;
  }
`;

export default GlobalStyle;
