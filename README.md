# hackiit-website

Hackiit Static Website

## Instalación para desarrollo

La página web usa la herramienta [Astro](https://astro.build/). Para poder usarla en el entorno de desarollo, sigue los siguientes pasos:

1. Descarga [NodeJS](https://nodejs.org/en) >= 19, recomendamos usar un gestor de versiones como [Volta](https://volta.sh/) o [NVM](https://github.com/nvm-sh/nvm).

1. Instala las dependencias con `npm install`, `pnpm install` o equivalente.

1. Ejecuta el scipt de servidor de desarrollo `dev`, via `npm run dev`, `pnpm dev` o equivalente.

## Producción con Docker

1. Primero, en tu entorno de desarollo, construye la imagen de Docker:

```bash
   docker build -t hackiit-website:latest .
```

2. El contenedor generado es completamente autocontenido y usa un servidor de Nginx para servir los archivos, por tanto sólo queda ejecutar el contenedor:

```bash
   docker run -d -p 8080:8080 hackiit-website:latest
```
