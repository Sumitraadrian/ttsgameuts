import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css';
import TTSGame from './component/TTSgame'; // Ganti import ini sesuai nama berkas yang berisi komponen TTSGame
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TTSGame />
  </React.StrictMode>
);

reportWebVitals();
