# Futpad

Pizarra táctica de fútbol para entrenadores, pensada para usarla en una tablet durante los entrenamientos y los partidos. Permite gestionar la plantilla, colocar a los jugadores en el campo, añadir rivales y guardar varias pizarras.

<!-- ![Pantalla principal de Futpad](docs/capturas/principal.png) -->

## Funcionalidades

- **Plantilla:** alta, edición y borrado de jugadores, con validación del nombre y del dorsal.
- **Campo:** tres fondos (entero, medio campo y córner), que se pueden cambiar en cualquier momento.
- **Fichas:** jugadores de la plantilla y rivales, que se arrastran con el dedo, el lápiz o el ratón.
- **Edición de fichas:** dorsal, color y rol (campo o portero), o quitarlas del campo.
- **Pizarras:** crear, guardar, abrir y eliminar, con aviso de cambios sin guardar.

Los datos se guardan en el navegador (`localStorage`); no hay servidor ni cuentas de usuario.

## Tecnologías

React 19 · TypeScript · Vite · Tailwind CSS v4 · Konva (React Konva) · Vitest + Testing Library

## Puesta en marcha

Requisitos: Node.js 20.19 o superior y npm.

```bash
npm install
npm run dev
```

La aplicación se abre en `http://localhost:5173`.

| Comando              | Qué hace                                                      |
| -------------------- | ------------------------------------------------------------- |
| `npm run dev`        | Servidor de desarrollo                                        |
| `npm run dev:tablet` | Servidor de desarrollo accesible desde la red local por HTTPS |
| `npm test`           | Tests (`npm test -- --run` para ejecutarlos una sola vez)     |
| `npm run build`      | Build de producción en `dist/`                                |
| `npm run preview`    | Sirve el build de producción                                  |
| `npm run lint`       | Análisis del código con oxlint                                |
| `npm run format`     | Formatea el código con Prettier                               |

### Abrirla desde una tablet

Fuera de `localhost`, la aplicación necesita HTTPS. Con `npm run dev:tablet` se sirve por HTTPS con un certificado de prueba: abre en la tablet la dirección **Network** que aparece en la terminal y acepta el aviso de seguridad del navegador.

Navegadores compatibles: versiones actuales de Chrome, Edge, Firefox y Safari (iPadOS 16 o superior).

## Estructura

```text
src/
├── components/   Interfaz (barra superior, panel, campo, diálogos, tarjeta de ficha)
├── hooks/        Estado de la aplicación
├── lib/          Funciones puras y reglas de negocio
├── storage/      Acceso a localStorage
├── types/        Tipos TypeScript
└── assets/       Fondos del campo (SVG)
```
