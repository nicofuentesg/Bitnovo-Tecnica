
# Bitnovo Técnica

Aplicación móvil desarrollada con React Native y Expo, diseñada para proporcionar una experiencia de usuario moderna y eficiente.

## 🚀 Características

- Desarrollado con React Native y Expo
- Interfaz de usuario moderna con NativeWind (TailwindCSS)
- Gestión de estado con React Query
- Navegación con Expo Router
- Soporte para TypeScript
- Componentes interactivos con React Native Reanimated
- Soporte para QR Code
- Gestión de formularios con Zod

## 📁 Estructura del Proyecto

El proyecto sigue una arquitectura en capas bien definida para mantener el código organizado y escalable:

```
├── app/                 # Capa de presentación (páginas y componentes)
├── components/         # Componentes reutilizables
├── context/           # Contextos de React para gestión de estado global
├── hooks/             # Custom hooks
├── model/             # Modelos y tipos de datos
├── navigation/        # Configuración de navegación
├── services/          # Capa de servicios (API calls, lógica de negocio)
├── types/             # Definiciones de tipos TypeScript
└── utils/             # Utilidades y funciones auxiliares
```

### Arquitectura en Capas

1. **Capa de Presentación (`app/`)**
   - Contiene las páginas y componentes principales
   - Implementa la interfaz de usuario
   - Utiliza Expo Router para la navegación

2. **Capa de Servicios (`services/`)**
   - Maneja la lógica de negocio
   - Gestiona las llamadas a APIs
   - Implementa la comunicación con servicios externos

3. **Capa de Datos (`model/`)**
   - Define los modelos de datos
   - Gestiona la estructura de la información
   - Implementa la validación de datos con Zod

4. **Capa de Estado (`context/`)**
   - Maneja el estado global de la aplicación
   - Implementa la lógica de gestión de estado
   - Utiliza React Context para compartir estado

5. **Capa de Utilidades (`utils/`, `hooks/`)**
   - Proporciona funciones auxiliares
   - Implementa custom hooks
   - Centraliza la lógica reutilizable

## 📋 Prerrequisitos

- Node.js (versión recomendada: 18 o superior)
- npm o yarn
- Expo CLI
- Xcode (para desarrollo iOS)
- Android Studio (para desarrollo Android)

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd bitnovotecnica
```

2. Instala las dependencias:
```bash
yarn install
# o
npm install
```

3. Inicia la aplicación:
```bash
# Para desarrollo
npx expo start

# Para iOS
npx expo run:ios

# Para Android
npx expo run:android
```

## 🛠️ Tecnologías Principales

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [NativeWind](https://www.nativewind.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Zod](https://zod.dev/)

## 📱 Características de la UI

- Diseño responsive
- Componentes interactivos
- Soporte para gestos
- Integración con QR Code
- Componentes de formulario optimizados
- Soporte para moneda y pickers
