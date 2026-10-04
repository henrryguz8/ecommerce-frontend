# E-commerce Frontend (Next.js)

Aplicación web de comercio electrónico construida con **Next.js (App Router)** y **TypeScript**. Consume la API REST desarrollada en Laravel (`ecommerce-api`) e implementa el flujo completo de compra: catálogo, autenticación, carrito, creación de órdenes, pago con Stripe e historial de compras.

## Tecnologías

- Next.js 16 (App Router) + React + TypeScript
- Tailwind CSS
- Server Components para lecturas y Server Actions para mutaciones
- Token de autenticación guardado en cookie `httpOnly`
- API REST en Laravel 12 con Sanctum y Stripe: [https://github.com/henrryguz8/ecommerce-api]

## Funcionalidades

- Catálogo público de productos y vista de detalle
- Registro e inicio de sesión (el token nunca se expone al navegador)
- Carrito de compras con estado local
- Creación de órdenes mediante Server Action
- Pago con Stripe (modo de prueba) y pantalla de confirmación
- Historial de compras en una ruta protegida
- Rutas protegidas con `proxy.ts`
- `loading.tsx` y `error.tsx` en las rutas clave y `Suspense` en el historial
- `revalidatePath()` tras crear órdenes y pagar, para evitar datos desactualizados

## Requisitos previos

- Node.js 20.9 o superior
- La API `ecommerce-api` corriendo en local (ver su README)

## Instalación

```bash
git clone https://github.com/henrryguz8/ecommerce-frontend
cd ecommerce-frontend
npm install
```

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```
API_URL=http://127.0.0.1:8000/api
```

La variable no lleva el prefijo `NEXT_PUBLIC_` a propósito, para que la URL de la API solo exista en el servidor.

## Ejecución

Primero levanta la API (en la carpeta `ecommerce-api`):

```bash
php artisan serve
```

Luego, en este proyecto:

```bash
npm run dev
```

La aplicación queda en `http://localhost:3000`.

Para la versión de producción:

```bash
npm run build
npm run start
```

## Rutas principales

| Ruta | Descripción | Protegida |
|------|-------------|-----------|
| `/` | Catálogo de productos | No |
| `/login` | Inicio de sesión y registro | No |
| `/cart` | Carrito | No |
| `/checkout` | Resumen y creación de la orden | Sí |
| `/checkout/payment` | Pago con Stripe | Sí |
| `/checkout/success` | Confirmación de compra | Sí |
| `/orders` | Historial de compras | Sí |

## Flujo de compra

1. El usuario agrega productos al carrito.
2. En el checkout, una Server Action envía los productos a `POST /api/orders` con el token.
3. Con el ID de la orden, la pantalla de pago llama a `POST /api/payments`.
4. Si el pago se aprueba, se muestra la confirmación, se vacía el carrito y la orden aparece como `paid` en el historial.

## Probar el pago

El pago usa el modo de prueba de Stripe. En la pantalla de pago se puede elegir entre tarjetas de prueba (Visa y Mastercard aprobadas, tarjeta rechazada y fondos insuficientes) para verificar tanto el pago exitoso como el manejo de errores.

## Rendimiento (Lighthouse)

Las pruebas se realizaron sobre `http://localhost:3000/` con la versión de producción (`npm run build` y `npm run start`).

| Dispositivo | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|-------------|-------------|---------------|------------------|-----|
| Escritorio | 97 | 100 | 96 | 100 |
| Móvil | 66 | 100 | 96 | 100 |

Métricas principales:

| Dispositivo | FCP | LCP | TBT | CLS | Speed Index |
|-------------|-----|-----|-----|-----|-------------|
| Escritorio | 0.3 s | 1.3 s | 10 ms | 0 | 0.6 s |
| Móvil | 0.8 s | 6.0 s | 490 ms | 0 | 1.6 s |

En móvil, el principal punto a mejorar es el LCP (6.0 s) y el TBT (490 ms). El resto de las métricas está en rango bueno.

## Autor

Henry Guzman — Bootcamp-FSJ35