
import { useState } from 'react';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';

// Recibimos 'rangos' y 'setRangos' como props desde App.jsx
function GestionRangos({ rangos, setRangos }) {
  
  // Estado *local* para guardar lo que el usuario escribe en el input
  const [nombreRango, setNombreRango] = useState('');

  const handleRegistrarRango = () => {
    if (nombreRango.trim() === '') {
      // (Podríamos mostrar un toast de error aquí también, si quisiéramos)
      return; 
    }
    
    // Creamos un nuevo objeto de rango
    const nuevoRango = {
      id: Date.now(), // Un ID simple y único
      nombre: nombreRango
    };

    // Actualizar la lista
    setRangos( [...rangos, nuevoRango] );
    
    // Limpiamos el input
    setNombreRango('');
  };

  // Plantilla para mostrar cada ítem en el DataScroller
  const itemTemplate = (rango) => {
    return (
      <div className="p-3">
        <strong>{rango.nombre}</strong>
      </div>
    );
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">

        <div className="col-md-6">
          <Panel header="Ingresar Categoría de Guerrero">
            <div className="p-fluid">
              <div className="p-field mb-3">
                <label htmlFor="nombreRango">Nombre del Rango</label>
                <InputText 
                  id="nombreRango" 
                  value={nombreRango} 
                  onChange={(e) => setNombreRango(e.target.value)} 
                />
              </div>
              <Button 
                label="Registrar Rango" 
                onClick={handleRegistrarRango} 
              />
            </div>
          </Panel>
        </div>

        <div className="col-md-6">
          <Panel header="Rangos Registrados">
            <DataScroller 
              value={rangos} 
              itemTemplate={itemTemplate} 
              rows={10} 
              header="Lista de Rangos" 
            />
          </Panel>
        </div>

      </div>
    </div>
  );
}

export default GestionRangos;