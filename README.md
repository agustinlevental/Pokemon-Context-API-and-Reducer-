# Pokemon Fullstack App
Aplicación desplegada y disponible online en : https://pokemon-fullstack-react-context-reducer-net8-web-phzn4q0d6.vercel.app/

Este proyecto es una aplicación Fullstack que utiliza **React.js** para el frontend y **.NET 8** con **Entity Framework** para crear una API Web siguiendo el enfoque code-first. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) usuarios en una base de datos real de Somee. Una vez creado el usuario, se puede agregar a favoritos tarjetas de pokemones, las cuales están populadas con el endpoint de **PokeAPI** y estilizadas con **module.css**.

## Características

- **CRUD de Usuarios:** Crear, Leer, Actualizar y Eliminar usuarios en la base de datos.
- **Favoritos de Pokémones:** Agrega a favoritos tarjetas de pokemones con datos obtenidos desde la PokeAPI.
- **Frontend:** Desarrollado con React.js , usando useContext para almacenar estados globales, y Reducer para manejar acciones dentro de la aplicación.
- **Backend:** API Web creada con .NET 8 y Entity Framework.

## Correr el Frontend de Manera Local

1. **Navega a la carpeta del proyecto:**
cd Pokemon-Context-API-and-Reducer-
2. **Instala las dependencias necesarias:**
npm install
3. **Ejecuta el servidor de desarrollo:**
npm run dev
4. **Accede al frontend:**
El frontend estará disponible en http://localhost:3000.

## Configuración del Backend
El backend está actualmente desplegado, por lo cual podrás interactuar con los endpoints y la base de datos sin tener que instalar nada localmente. Próximamente se colocará aquí el enlace al repositorio del backend donde se encuentran las APIs Web realizadas con .NET 8 y Entity Framework.

Accede a Swagger para testear los endpoints:
1. **Abre en una página del navegador el siguiente enlace:**
http://leventalpokeapi.somee.com/swagger/index.html

Esto abrirá el Swagger para testear los endpoints de la API Web de la misma manera que desde la aplicación.

¡Ya puedes utilizar la aplicación!
