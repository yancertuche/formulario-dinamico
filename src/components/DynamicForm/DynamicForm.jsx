import React, { useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './DynamicForm.css';

const DynamicForm = ({ configuration }) => {
  // Crear dinámicamente el esquema de validación basado en la configuración
  const validationSchema = useMemo(() => {
    const shape = {};
    configuration.fields.forEach((field) => {
      if (field.type === 'number') {
        let validator = Yup.number().typeError('Debe ser un número');
        if (field.validations.required) {
          validator = validator.required('Este campo es obligatorio');
        }
        if (typeof field.validations.min !== 'undefined') {
          validator = validator.min(field.validations.min, `Valor mínimo: ${field.validations.min}`);
        }
        if (typeof field.validations.max !== 'undefined') {
          validator = validator.max(field.validations.max, `Valor máximo: ${field.validations.max}`);
        }
        shape[field.label] = validator;
      } else {
        let validator = Yup.string();
        if (field.validations.required) {
          validator = validator.required('Este campo es obligatorio');
        }
        shape[field.label] = validator;
      }
    });
    return Yup.object().shape(shape);
  }, [configuration]);

  // Generar los valores iniciales para el formulario
  const initialValues = useMemo(() => {
    const values = {};
    configuration.fields.forEach((field) => {
      values[field.label] = '';
    });
    return values;
  }, [configuration]);

  // Función de envío
  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    console.log("Formulario enviado:", values);
  };

  return (
    <div className="dynamic-form-container">
      <h2>{configuration.formName}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="dynamic-form">
            {configuration.fields.map((field, index) => (
              <div key={index} className="form-group">
                <label htmlFor={field.label}>{field.label}:</label>
                <Field
                  name={field.label}
                  id={field.label}
                  type={field.type}
                  className="form-field"
                />
                <ErrorMessage
                  name={field.label}
                  component="div"
                  className="error-message"
                />
              </div>
            ))}
            <button type="submit" className="btn-submit">
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DynamicForm;
