export const contactFormConfig = {
  inputs: [
    {
      type: 'text',
      name: 'name',
      label: 'Nombre',
    },
    {
      type: 'email',
      name: 'email',
      label: 'Correo electrónico',
    },
  ],
  textarea: {
    label: 'Mensaje',
  },
  disclaimer: {
    label: 'Al enviar este formulario de contacto, reconoces y aceptas la recopilación de tu información personal.',
  },
  description: 'Nuestro equipo de soporte generalmente responde dentro de las 24 horas hábiles.',
};
