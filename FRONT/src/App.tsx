import { ThemeProvider } from 'styled-components';
import { QueryClientProvider } from 'react-query';
import Modal from 'react-modal';
import { Board } from './components/Board';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import { queryClient } from './services/queryClient';

Modal.setAppElement('#root');

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Board />
        <GlobalStyle />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
