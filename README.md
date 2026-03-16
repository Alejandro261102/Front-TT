# Aplicación Web TT2

Frontend de una aplicación web de gestión de archivos, diseñada como parte de un trabajo terminal.  
El proyecto contempla vistas públicas y privadas para navegación, visualización, organización y carga de archivos, con una interfaz moderna, consistente y centrada en la experiencia del usuario.

## Descripción

Esta aplicación web simula una plataforma de almacenamiento y administración de archivos en la nube.  
En esta etapa del proyecto se desarrolla principalmente el **frontend**, por lo que varias funcionalidades se presentan a nivel visual o de interacción local, sin depender todavía de un backend funcional.

La interfaz incluye módulos como:

- Dashboard del usuario
- Gestión de carpetas
- Vista de archivos
- Recientes
- Compartidos
- Papelera
- Subida de archivos
- Búsqueda
- Notificaciones
- Vistas públicas como inicio de sesión, registro e inicio

Además, el proyecto contempla el uso de **HTML, CSS, JavaScript y React**, buscando una transición ordenada entre vistas estáticas y componentes reutilizables.

## Objetivo

Desarrollar una interfaz web funcional, clara y visualmente consistente para una plataforma de administración de archivos, aplicando buenas prácticas de estructura, diseño responsivo y reutilización de componentes.

## Tecnologías utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **React**
- **Git y GitHub**

## Estructura general del proyecto

La estructura puede crecer conforme se integren nuevas vistas, componentes y lógica en React.

## Características principales

-- *Diseño visual consistente entre todas las vistas*

Header reutilizable

Menú lateral desplegable con overlay

Footer simplificado

Tarjetas y secciones con estilo uniforme

Navegación entre vistas principales

Preparado para evolucionar a componentes en React

Base enfocada en frontend, sin restricciones reales de autenticación por el momento

Vistas consideradas

Home / Dashboard

Carpetas

Detalle de carpeta o archivo

Recientes

Compartidos

Vista de archivo

Subir archivo

Papelera

Resultados de búsqueda

Notificaciones

Consideraciones actuales

Por el momento, las vistas pueden ser accesibles sin autenticación real.

Algunas funciones están planteadas solo a nivel de interfaz.

La lógica de backend y persistencia no forma parte de esta fase.

Se busca mantener una base sólida de frontend para integrar funcionalidades reales después.

Convenciones de diseño

Para mantener consistencia visual en todo el proyecto, se busca reutilizar:

Misma paleta de colores

Misma tipografía base

Mismo estilo de botones

Mismo sistema de cards

Mismo header para vistas autenticadas

Mismo menú lateral desplegable

Mismos espaciados y bordes redondeados

Uso de React en el proyecto

Aunque parte del proyecto puede comenzar con archivos HTML estáticos, React se utilizará para:

Reutilizar componentes comunes

Separar la interfaz en módulos

Facilitar mantenimiento y escalabilidad

Mejorar la organización del código

Preparar el frontend para una integración más robusta con backend

Ejemplos de componentes que pueden migrarse o implementarse en React:

Header

Sidebar

Footer

Tarjetas de archivos

Tarjetas de carpetas

Barra de búsqueda

Modal de detalles

Panel de notificaciones

Cómo ejecutar el proyecto

Si estás trabajando con archivos HTML, puedes abrir directamente las vistas en el navegador o utilizar una extensión como Live Server en Visual Studio Code.

Si trabajas con React, primero instala las dependencias y ejecuta el entorno de desarrollo:

npm install
npm run dev

o, dependiendo de la configuración del proyecto:

npm start
Estado del proyecto

En desarrollo.
Actualmente enfocado en la construcción del frontend, el diseño visual y la consistencia entre vistas.

Posibles mejoras futuras

Integración con backend

Inicio de sesión real

Gestión real de archivos y carpetas

Persistencia de datos

Búsqueda dinámica

Sistema funcional de notificaciones

Soporte responsivo más avanzado

Componentización completa en React

Autor

Héctor Alejandro Hernández Aranda

Licencia

Este proyecto es de carácter académico y fue desarrollado con fines educativos.