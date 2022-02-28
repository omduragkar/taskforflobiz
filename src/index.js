import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import ContextUser from './context/ContextUser';

ReactDOM.render(
  <ChakraProvider>
    <ContextUser>
      <App />
    </ContextUser>
  </ChakraProvider>,
  document.getElementById('root')
);