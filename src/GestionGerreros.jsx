
import { useState } from 'react';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// Recibimos los props de App.jsx
function GestionGuerreros({ rangos, guerreros, setGuerreros, toastRef }) {

  // Estado local para el *nuevo* guerrero
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState(null); // 'null' para que el Dropdown muestre el placeholder
  const [nivel, setNivel] = useState(null);
  const [rangoSeleccionado, setRangoSeleccionado] = useState(null);

  const tiposGuerrero = [
    { label: 'Orco', value: 'Orco' },
    { label: 'Uruk', value: 'Uruk' }
  ];
  
  // Opciones de rangos para el Dropdown. Deben tener 'label' y 'value'
  const opcionesRangos = rangos.map(r => ({ label: r.nombre, value: r }));

  const handleRegistrarGuerrero = () => {
    // 1. Validación
    if (!nombre || !tipo || !nivel || !rangoSeleccionado) {
      // Usamos la referencia del 'padre' (App.jsx) para mostrar el error 
      toastRef.current.show({
        severity: 'error', 
        summary: 'Error de Validación', 
        detail: 'Todos los campos son obligatorios'
      });
      return;
    }
    
    // 2. Si es válido, creamos el guerrero
    const nuevoGuerrero = {
      id: Date.now(),
      nombre: nombre,
      tipo: tipo,
      nivel: nivel,
      rango: rangoSeleccionado
    };

    // 3. Actualizamos el estado
    setGuerreros([...guerreros, nuevoGuerrero]);
    
    // 4. Limpiamos el formulario
    setNombre('');
    setTipo(null);
    setNivel(null);
    setRangoSeleccionado(null);
  };
  
  const handleEliminarGuerrero = (idGuerrero) => {
    // Filtramos la lista, quitando el guerrero con el id coincidente
    const tropasActualizadas = guerreros.filter(g => g.id !== idGuerrero);
    setGuerreros(tropasActualizadas);
  };

  // Plantilla para el botón de eliminar en la tabla
  const bodyBotonEliminar = (rowData) => {
    return (
      <Button 
        label="Asesinado por la aparición" 
        icon="pi pi-times" 
        className="p-button-danger"
        onClick={() => handleEliminarGuerrero(rowData.id)} 
      />
    );
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        
        {/* Columna Izquierda: Formulario Ingresar Guerrero  */}
        <div className="col-md-6">
          <Panel header="Ingresar Guerrero">
            <div className="p-fluid">
              <div className="p-field mb-3">
                <label htmlFor="nombre">Nombre</label>
                <InputText id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} /> {/* [cite: 19] */}
              </div>
              
              <div className="p-field mb-3">
                <label htmlFor="tipo">Tipo</label>
                <Dropdown id="tipo" value={tipo} options={tiposGuerrero} onChange={(e) => setTipo(e.value)} placeholder="Seleccione un tipo"/> {/* [cite: 20] */}
              </div>
              
              <div className="p-field mb-3">
                <label htmlFor="nivel">Nivel</label>
                <InputNumber id="nivel" value={nivel} onValueChange={(e) => setNivel(e.value)} max={100} /> {/* [cite: 21] */}
              </div>

              <div className="p-field mb-3">
                <label htmlFor="rango">Rango</label>
                <Dropdown id="rango" value={rangoSeleccionado} options={opcionesRangos} onChange={(e) => setRangoSeleccionado(e.value)} placeholder="Seleccione un rango"/> {/*  */}
              </div>
              
              <Button label="Registrar Guerrero" onClick={handleRegistrarGuerrero} /> {/* [cite: 23] */}
            </div>
          </Panel>
        </div>
        
        {/* Columna Derecha: Mostrar Tropas */}
        <div className="col-md-6">
          <Panel header="Detalle de las Tropas de Sauron">
            <DataTable value={guerreros} emptyMessage="No hay tropas registradas.">
              <Column field="nombre" header="Nombre" /> 
              <Column field="tipo" header="Tipo" /> 
              <Column field="rango.nombre" header="Rango" />
              <Column body={bodyBotonEliminar} header="Acción" />
            </DataTable>
          </Panel>
        </div>
        
      </div>
    </div>
  );
}

export default GestionGuerreros;