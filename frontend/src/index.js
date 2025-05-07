import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from './theme';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
	<ThemeProvider theme={darkTheme}>
		<CssBaseline />
		<App />
  	</ThemeProvider>
</React.StrictMode>
);
