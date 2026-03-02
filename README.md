# Unicash

Aplicación web enfocada en registro de gastos personales, presupuesto y visualización de reportes en interfaz móvil.

## Wireframes de diseño (Miro)

- Miro: https://miro.com/app/board/uXjVGENDMKA=/

## Tecnologías usadas

- React
- TypeScript
- Vite
- Tailwind CSS v4
- React Router DOM (navegación por rutas)
- Recharts (gráficas)

## Librerías importadas

Dependencias principales del proyecto:

- `react`
- `react-dom`
- `react-router-dom`
- `react-icons`
- `recharts`
- `tailwindcss`
- `@tailwindcss/vite`

Herramientas de desarrollo:

- `typescript`
- `vite`
- `eslint` + `typescript-eslint`
- `@vitejs/plugin-react`

## Arquitectura general

La app está organizada por capas simples:

- `src/pages`: vistas principales (Home, Presupuesto, Reportes, Ajustes, etc.)
- `src/components`: componentes reutilizables de UI y modales
- `src/Data`: acceso y utilidades de persistencia (localStorage)

## Rutas actuales

- `/` → redirección automática según datos iniciales
- `/inicio`
- `/ajustes-iniciales`
- `/home`
- `/presupuesto`
- `/reportes`
- `/ajustes`
- `/ajustes/editar-categorias`
- `/ajustes/historial`

## Persistencia local

La app guarda información en `localStorage` bajo el prefijo `unicash.`

Claves principales:

- `unicash.ajustesIniciales`
- `unicash.categorias`
- `unicash.movimientos`

## Scripts disponibles

- `npm run dev` → levanta entorno de desarrollo
- `npm run build` → compilación TypeScript + build de producción
- `npm run preview` → previsualización del build
- `npm run lint` → análisis estático con ESLint

## Cómo ejecutar el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en desarrollo:

```bash
npm run dev
```

3. Abrir en navegador la URL mostrada por Vite (usualmente `http://localhost:5173`).

## Funcionalidades principales

- Registro de ajustes iniciales (nombre, presupuesto, periodo)
- Registro y eliminación de movimientos
- Edición de categorías personalizadas
- Seguimiento de presupuesto por periodo
- Reportes por categoría, valor, día y semana con gráficas
- Reseteo completo de datos del usuario
