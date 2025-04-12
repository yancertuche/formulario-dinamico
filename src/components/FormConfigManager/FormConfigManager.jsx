import React, { useState, useEffect } from 'react';
import './FormConfigManager.css';
import FieldConfigForm from '../FieldConfigForm/FieldConfigForm';

const FormConfigManager = ({ onConfigChange }) => {
  const [fieldsConfig, setFieldsConfig] = useState([]);
  const [formName, setFormName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Actualiza la configuración global cada vez que cambie el nombre o la lista de campos
  useEffect(() => {
    onConfigChange({
      formName,
      fields: fieldsConfig,
    });
  }, [formName, fieldsConfig, onConfigChange]);

  const handleAddOrUpdateField = (fieldConfig) => {
    if (editingIndex === null) {
      // Agregar campo
      setFieldsConfig([...fieldsConfig, fieldConfig]);
    } else {
      // Actualizar campo existente
      const updatedFields = [...fieldsConfig];
      updatedFields[editingIndex] = fieldConfig;
      setFieldsConfig(updatedFields);
      setEditingIndex(null);
    }
  };

  const handleDeleteField = (index) => {
    const updatedFields = fieldsConfig.filter((_, i) => i !== index);
    setFieldsConfig(updatedFields);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const handleEditField = (index) => {
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const editingFieldInitialValues =
    editingIndex !== null ? fieldsConfig[editingIndex] : undefined;

  return (
    <div className="form-config-manager">
      <h2>Configurador de Formulario</h2>
      <div className="form-name-group">
        <label htmlFor="formName">Nombre del Formulario:</label>
        <input
          type="text"
          id="formName"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder="Ingrese el nombre del formulario"
        />
      </div>
      <FieldConfigForm
        onSubmit={handleAddOrUpdateField}
        initialValues={editingFieldInitialValues}
        onCancel={handleCancelEdit}
      />
      <div className="config-summary">
        <h3>Configuración Actual</h3>
        {formName && <p><strong>Formulario:</strong> {formName}</p>}
        {fieldsConfig.length === 0 ? (
          <p>No hay campos configurados.</p>
        ) : (
          <ul>
            {fieldsConfig.map((field, index) => (
              <li key={index}>
                <strong>{field.label}</strong> ({field.type})
                {field.validations.required && ' - Obligatorio'}
                {field.type === 'number' && (
                  <>
                    {typeof field.validations.min !== 'undefined' &&
                      `, Mín: ${field.validations.min}`}
                    {typeof field.validations.max !== 'undefined' &&
                      `, Máx: ${field.validations.max}`}
                  </>
                )}
                <div className="field-actions">
                  <button
                    type="button"
                    onClick={() => handleEditField(index)}
                    className="btn-edit"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteField(index)}
                    className="btn-delete"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FormConfigManager;
