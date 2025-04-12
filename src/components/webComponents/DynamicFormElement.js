import React from 'react';
import { createRoot } from 'react-dom/client';
import DynamicForm from '../DynamicForm/DynamicForm';

class DynamicFormElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.mountPoint = document.createElement('div');
    this.shadowRoot.appendChild(this.mountPoint);
  }

  connectedCallback() {
    const configAttr = this.getAttribute('config');
    let config;
    if (configAttr) {
      try {
        config = JSON.parse(configAttr);
      } catch (e) {
        console.error('Error parseando el atributo config, usando configuración por defecto.', e);
      }
    }
    if (!config) {
      config = { formName: 'Formulario Dinámico', fields: [] };
    }

    // Usamos createRoot y luego renderizamos el componente
    this._root = createRoot(this.mountPoint);
    this._root.render(<DynamicForm configuration={config} />);
  }

  disconnectedCallback() {
    if (this._root) {
      setTimeout(() => {
        this._root.unmount();
      }, 0);
    }
  }
}

customElements.define('dynamic-form-element', DynamicFormElement);
