import { useState, useRef } from 'react'; // Importamos los Hooks
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { TabView, TabPanel } from 'primereact/tabview';
import logo from './assets/image/El-senor-de-los-anillos.jpg';

import GestionRangos from './GestionRangos';
import GestionGuerreros from './GestionGerreros';

function App() {
  // 1. Una lista para guardar los rangos que se registren.
  const [rangos, setRangos] = useState([]);
  
  // 2. Una lista para guardar los guerreros.
  const [guerreros, setGuerreros] = useState([]);
  
  // 3. Una referencia para poder activar el Toast desde cualquier parte.
  const toastRef = useRef(null);
  
  // --- Requerimientos del Toolbar ---
  // En la izquierda de la misma debe aparecer un logotipo del Anillo Único.
  // A la derecha debe incluir un título que diga "Uno para dominarlos a todos".
  const toolbarIzquierda = (
    <img alt="logo" src={logo} height="40" /> // imagen importada desde assets
  );
  const toolbarDerecha = (
    <h3 className="m-0">"Uno para dominarlos a todos"</h3> // [cite: 9]
  );

  return (
    <div>
      {/* El Toast debe estar en el nivel más alto para mostrarse sobre todo */}
      <Toast ref={toastRef} />
      <Toolbar start={toolbarIzquierda} end={toolbarDerecha} />
      <TabView>
        <TabPanel header="Registrar Rangos">
          <GestionRangos 
            rangos={rangos} 
            setRangos={setRangos} 
          />
        </TabPanel>
        {/* 3. La pestaña de guerreros está deshabilitada si no hay rangos */}
        <TabPanel header="Ingresar Guerrero" disabled={rangos.length === 0}>
           <GestionGuerreros 
              rangos={rangos} 
              guerreros={guerreros}
              setGuerreros={setGuerreros}
              toastRef={toastRef}
           />
        </TabPanel>
      </TabView>
    </div>
  )
}

export default App