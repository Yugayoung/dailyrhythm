import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
  font-family: 'GmarketSansLight';
  src: url('./fonts/GmarketSansLight.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'GmarketSansMedium';
  src: url('./fonts/GmarketSansMedium.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'GmarketSansLight', 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 960px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  outline: none;
}



li {
  list-style: none;
}

a {
  text-decoration: none;
}

button {
  cursor: pointer;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

#root {
  width: 100%;
  max-width: 960px;
}
`;

export default GlobalStyle;
