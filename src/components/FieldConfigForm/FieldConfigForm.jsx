import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './FieldConfigForm.css';

const FieldConfigForm = ({ onSubmit, initialValues, onCancel }) => {
  const isEditMode = Boolean(initialValues);
  // Valores por defecto: se pide solo la etiqueta, tipo y validaciones.
  const defaultValues = {
    label: '',
    type: 'text',
    required: false,
    min: '',
    max: '',
  };

  const validationSchema = Yup.object().shape({
    label: Yup.string().required('La etiqueta es obligatoria'),
    type: Yup.string().oneOf(['text', 'number']).required('El tipo es obligatorio'),
    required: Yup.boolean(),
    // Los campos min y max solo se aplican para números; se definen como opcionales (nullable)
    min: Yup.number().nullable(),
    max: Yup.number().nullable(),
  });

  const handleSubmit = (values, formikBag) => {
    // Genera el nombre del campo a partir de la etiqueta (sin el input "name")
    const fieldConfig = {
      label: values.label,
      name: values.label.toLowerCase().replace(/\s+/g, '_'),
      type: values.type,
      validations: {
        required: values.required,
      },
    };

    if (values.type === 'number') {
      fieldConfig.validations.min = values.min !== '' ? Number(values.min) : undefined;
      fieldConfig.validations.max = values.max !== '' ? Number(values.max) : undefined;
    }

    onSubmit(fieldConfig);
    formikBag.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues || defaultValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className="field-config-form">
          <p>Agrega o modifica los campos que necesites a tu formulario, podrás gestionar los campos agregados en el apartado inferior Configuración Actual. </p>
          <div className="config-group">
            <label htmlFor="label">Nombre de la etiqueta:</label>
            <Field name="label" type="text" id="label" />
            <ErrorMessage name="label" component="div" className="error-message" />
          </div>
          <div className="config-group">
            <label htmlFor="type">Tipo de entrada:</label>
            <Field as="select" name="type" id="type">
              <option value="text">Texto</option>
              <option value="number">Numérico</option>
            </Field>
            <ErrorMessage name="type" component="div" className="error-message" />
          </div>
          <div className="config-group checkbox-group">
            <Field type="checkbox" name="required" id="required" />
            <label htmlFor="required">Obligatorio</label>
          </div>
          {values.type === 'number' && (
            <>
              <div className="config-group">
                <label htmlFor="min">Valor Mínimo:</label>
                <Field name="min" type="number" id="min" />
                <ErrorMessage name="min" component="div" className="error-message" />
              </div>
              <div className="config-group">
                <label htmlFor="max">Valor Máximo:</label>
                <Field name="max" type="number" id="max" />
                <ErrorMessage name="max" component="div" className="error-message" />
              </div>
            </>
          )}
          <div className="button-group">
            <button type="submit" className="btn-submit">
              {isEditMode ? 'Actualizar Campo' : 'Agregar Campo'}
            </button>
            {isEditMode && (
              <button type="button" className="btn-cancel" onClick={onCancel}>
                Cancelar
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FieldConfigForm;
