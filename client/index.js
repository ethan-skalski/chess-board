import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app.jsx';

import style from './style.css';

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
