import '@/components/keenicons/assets/styles.css';
import './styles/globals.css';

// import axios from 'axios'; // Removed unused import
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { ProvidersWrapper } from './providers';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ProvidersWrapper>
      <App />
    </ProvidersWrapper>
  </React.StrictMode>
);
