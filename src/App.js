import { useState } from 'react';
import './App.css';
import DynamicForm from './components/DynamicForm/DynamicForm';
import FormConfigManager from './components/FormConfigManager/FormConfigManager';

function App(){
  const [formConfig, setFormConfig] = useState({
    formName: '',
    fields: [],
  });

  const handleConfigChange = (newConfig) => {
    setFormConfig(newConfig);
  };

  return (
    <div className="app-container">
      <div className="configurator-container">
        <h1>Gestor de Formulario Dinámico</h1>
        <FormConfigManager onConfigChange={handleConfigChange} />
      </div>
      <div className="preview-container">
        <h1>Vista Previa del Formulario</h1>
        <DynamicForm configuration={formConfig} />
      </div>
    </div>
  );
}


export default App;
