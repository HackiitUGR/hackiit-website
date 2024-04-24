# Instrucciones para contribuir

`Toda persona aporta algo mundo, nosotros nos conformamos con un poco de html y css :)`

##  ¿Quieres aportar código?

1. Clona el repositorio, bien como propietario en caso de pertenecer a la organización de Hackiit o sino realizando un fork del repositorio.

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

5. Crea una Pull Request de tu rama hacia la rama `master` con tus cambios. Se recomienda realizarlo desde el cliente web por su fácilidad, normalmente justo tras crear la rama te alerta GitHub de crear el Pull Request correspondiente, en el cual tendras que añadir una descripción exacta de todos los cambios realizados.

6. Espera a que alguien la revise y apruebe los cambios.

## ¿Ves uno de los multiples errorer?

1. Crea un Issue explicando cual es el fallo
2. Espera que alguien te responda
3. Nadie te responde, procede a arreglarlo tu mismo :)

Para solucionar cualquier Issue se puede solucionar a traves de cualquier Pull Request. Simplemente crear un commit en el que el mensaje termine con `close #3`, donde `#3` corresponde con el id del Issue (El cual se puede ver tanto en el propio titulo del issue como en la url del mismo).


