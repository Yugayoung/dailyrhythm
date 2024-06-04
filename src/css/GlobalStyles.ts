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

:root {
  
  
  /* --color-bg: #f5ebe0;
  --color-text: #393122;
  --color-accent: #d6ccc2;
  --color-white: #edede9;
  --color-scrollbar: #e3d5ca;
  --color-darkBeige: #d5bdaf; */
}

body {
  margin: 0;
  font-family: 'GmarketSansLight';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
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
