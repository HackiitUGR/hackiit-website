# Instrucciones para contribuir

`Toda persona aporta algo al mundo, nosotros nos conformamos con un poco de html y css :)`

## Roadmap de las issues

El trabajo pendiente de la pagina esta organizado en un proyecto de GitHub donde las issues son etiquetadas por diferentes parámetros para que sea mas fácil su selección y filtrado. Para acceder a esta solo tienes que consultar al siguiente enlace https://github.com/orgs/HackiitUGR/projects/4?query=sort%3Aupdated-desc+is%3Aopen.

**Nota**: en caso de no poder asignarte las issues directamente en el tablero, ir a la issue que se quiere asignar y etiquetar en los comentarios a @puchy22 o a @chelunike para que te la asignen.

##  ¿Quieres aportar código?

1. Crea un fork del repositorio en tu cuenta de GitHub. Para ello simplemente tienes que hacer click en el botón de `Fork` en la parte superior derecha de la página. Esto creará una copia del repositorio en tu cuenta de GitHub, clona el repositorio en tu máquina local.

2. A continuación crear una rama en la que trabajar, se puede crear con los siguientes comandos:
```bash
# Crea y cambia a la rama
git checkout -b <nombre-rama>

# --- ó ----

git branch <nombre-rama>
git checkout <nombre-rama>
```

3. Realiza los cambios pertinentes en el código, añadiendo ficheros si fuera necesario.

4. Y una vez este todo listo y probado, tienes que subir los cambios. Para ello primero hay que añadir los cambios y realizar un commit de la siguiente forma:
```bash
# Stageamos / Añadimos los cambios
git add <ruta a los ficheros modificados>
# Creamos 
git commit -m "Breve descripción de los cambios"
# Subimos los cambios a la rama correspondiente
git push origin <nombre-rama>
```

5. Crea una Pull Request de tu rama hacia la rama `master` con tus cambios. Si no tienes experiencia previa recomendamos usar el cliente web por su fácilidad, normalmente justo tras crear la rama te alerta GitHub de crear el Pull Request correspondiente, en el cual tendras que añadir una descripción exacta de todos los cambios realizados.

6. Espera a que alguien la revise y apruebe los cambios, si nadie lo hace en un tiempo prudencial, etiqueta a alguno de los principales contribuidores del repositorio en un comentario de la PR. Principalmente a @puchy22 o @chelunike.

### Enlaces de referencia

Si no te es suficiente con nuestro ejemplo te recomendamos los siguientes tutoriales donde tambien se explica:
- https://www.freecodecamp.org/espanol/news/como-hacer-tu-primer-pull-request-en-github/
- https://www.youtube.com/watch?v=BPns9r76vSI

## ¿Ves uno de los multiples errores?

1. Crea un Issue explicando cual es el fallo.
2. Espera que alguien te responda.
3. Nadie te responde, procede a arreglarlo tu mismo :)
	1. Para indicar que una PR esta resolviendo una issue se puede indicar en los commits o el mensaje de la PR añadiendo el texto `fix #<issue_id>`, así cuando la PR se incorpore a la rama principal la issue se cerrará de manera automática.

## ¿Quieres aportar con una entrada en nuestro blog?
Los posts se agregan en un fichero markdown.
El nombre del fichero no debe contener espacios, se utilizan guiones ("-") para sustituirlos y la extensión debe ser "md". La ruta para la subida debe ser: `src/content/post`.

En la parte superior del fichero debes introducir la siguiente cabecera:

```markdown
---
publishDate: 2024-05-10T12:00:00Z
title: 'Escribe aquí el título de tu artículo'
excerpt: 'Escribe un breve resumen de 1 o 2 líneas sobre lo que trata el post. Esto aparecerá en la página principal.'
image: '~/assets/images/nombre-de-tu-imagen.png'
category: 'Tutoriales'
tags:
  - web
  - ctf
  - inyeccion-sql
author: 'Tu Nombre o Nickname'
---

# Aquí empieza el contenido de tu artículo usando Markdown normal...
```
Es importante que agregues en `src/assets/images/` una imagen para tu post.