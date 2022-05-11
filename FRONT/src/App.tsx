import { ThemeProvider } from 'styled-components';
import { Board } from './components/Board';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Board />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
