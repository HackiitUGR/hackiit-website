# Instrucciones para contribuir

`Toda persona aporta algo al mundo, nosotros nos conformamos con un poco de html y css :)`

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

6. Espera a que alguien la revise y apruebe los cambios, si nadie lo hace en un tiempo prudencial, etiqueta a alguno de los principales contribuidores del repositorio en un comentario de la PR.

## ¿Ves uno de los multiples errores?

1. Crea un Issue explicando cual es el fallo.
2. Espera que alguien te responda.
3. Nadie te responde, procede a arreglarlo tu mismo :)

Para solucionar cualquier Issue se puede solucionar a traves de cualquier Pull Request. Simplemente crear un commit en el que el mensaje termine con `fix #<issue_id>` (el cual se puede ver tanto en el propio titulo del issue como en la url del mismo).
