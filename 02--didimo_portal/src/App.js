import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';

import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import axios from 'axios';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import { StoreProvider } from './context/store';

const App = () => {
  const content = useRoutes(routes);
  axios.defaults.baseURL = process.env.REACT_APP_API_ROOT;

  console.log('THIS SHOULD WORK ONLY ONE TIME');

  return (
    <StoreProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {content}
        </ThemeProvider>
      </StyledEngineProvider>
    </StoreProvider>
  );
};

export default App;
