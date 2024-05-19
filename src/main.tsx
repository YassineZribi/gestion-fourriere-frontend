import React from 'react'
import ReactDOM from 'react-dom/client'
import { DirectionProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import App from './App.tsx'
import './i18n';
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DirectionProvider>
      <MantineProvider defaultColorScheme='light'>
        <Notifications position='bottom-center' />
        <App />
      </MantineProvider>
    </DirectionProvider>
  </React.StrictMode>,
)
