## APART Cliente - README 📚

Este proyecto es el frontend de la aplicación **Apart**, construido con **Next.js 14** 🚀. Este README te guiará a través de los pasos para configurar y ejecutar el proyecto localmente 🖥️, así como para desplegarlo en **AWS** 🌐.

---

## Configuración del Proyecto ⚙️

### Clonar el Repositorio 📥

Para clonar el repositorio, usa el siguiente comando:

```sh
git clone <URL_DE_TU_REPOSITORIO>
```

### Variables de Entorno 🌍

Crea un archivo `.env.local` en la raíz del proyecto y agrega las siguientes variables de entorno:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api  # O la URL de tu API local
```

### Ejecutar el Proyecto en Desarrollo 🏃‍♂️

Para ejecutar el proyecto en desarrollo, usa el siguiente comando:

```sh
npm run dev
```

---

## Datos de Sesión 🔐

La gestión y validación de los datos de la sesión se realiza de la siguiente manera:

### Lado del Cliente 🖥️

* **[authGuard.tsx](src/components/guards/authGuard.tsx)**: Controla la sesión en el lado del cliente, funcionando como un interceptor basado en los datos persistentes de **accountStore.ts**.

* **[accountStore.ts](src/data/store/accountStore.ts)**: Almacena y persiste la información de sesión en el **localStorage** del navegador.

### Lado del Servidor 🌐

* **[authenticationCookiesActions.ts](src/data/serverActions/authenticationCookiesActions.ts)**: Gestiona y devuelve la información de sesión almacenada en cookies en el servidor.

---

## Utilidades 🛠️

Cuando se establece o elimina una sesión, se recomienda utilizar el utilitario **sessionHandlerUtils.ts** en lugar de interactuar directamente con los manejadores de sesión de forma individual. Los manejadores deben usarse solo como elementos de consulta, dependiendo del contexto en el que se necesite validar la sesión, ya sea del lado del servidor o del cliente.

* **[sessionHandlerUtils.ts](src/utils/sessionHandlerUtils.ts)**: Establece y elimina la sesión de manera centralizada tanto en el cliente como en el servidor.

---