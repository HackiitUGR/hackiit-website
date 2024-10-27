name: "🐛 Reporte de Error"
description: Crear un nuevo ticket para un error.
title: "🐛 [ERROR] - <título>"
labels: [
  "error"
]
body:
  - type: textarea
    id: descripcion
    attributes:
      label: "Descripción"
      description: Por favor, introduce una descripción explícita de tu problema
      placeholder: Descripción breve y explícita de tu incidente...
    validations:
      required: true
  - type: textarea
    id: pasos-reproduccion
    attributes:
      label: "Pasos para Reproducción"
      description: Por favor, introduce una descripción explícita de tu problema
      value: |
        1. Ir a '...'
        2. Hacer clic en '....'
        3. Desplazarse hacia abajo hasta '....'
        4. Ver el error
      render: bash
    validations:
      required: true
  - type: textarea
    id: capturas
    attributes:
      label: "Capturas de Pantalla"
      description: Si es aplicable, añade capturas de pantalla para ayudar a explicar tu problema.
      value: |
        ![DESCRIPCIÓN](ENLACE.png)
      render: bash
    validations:
      required: false
  - type: textarea
    id: logs
    attributes:
      label: "Logs"
      description: Por favor, copia y pega cualquier salida de logs relevante. Esto se formateará automáticamente como código, por lo que no es necesario añadir comillas inversas.
      render: bash
    validations:
      required: false
  - type: dropdown
    id: navegadores
    attributes:
      label: "Navegadores"
      description: ¿En qué navegadores ves el problema?
      multiple: true
      options:
        - Firefox
        - Chrome
        - Safari
        - Microsoft Edge
        - Opera
    validations:
      required: false
