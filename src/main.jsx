import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 1. Importa el tema de PrimeReact
import 'primereact/resources/themes/saga-blue/theme.css'; 
// 2. Importa estilos base de PrimeReact
import 'primereact/resources/primereact.min.css';
// 3. Importa los íconos
import 'primeicons/primeicons.css';
// 4. Importa Bootstrap (solo para la grilla)
import 'bootstrap/dist/css/bootstrap-grid.min.css'; // Usamos solo la grilla

import './index.css' // CSS personalizado

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)