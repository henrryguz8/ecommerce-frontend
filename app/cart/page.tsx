"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            Mi carrito
          </h1>

          <div className="rounded-xl bg-white p-8 text-center shadow-md">
            <p className="mb-6 text-gray-600">
              Tu carrito está vacío.
            </p>

            <Link
              href="/"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Ver productos
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Mi carrito
          </h1>

          <Link
            href="/"
            className="text-blue-600 hover:underline"
          >
            Seguir comprando
          </Link>
        </div>

        <div className="space-y-4">
          {cart.map((item) => (
            <article
              key={item.id}
              className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-md"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="h-24 w-24 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-gray-900">
                  {item.name}
                </h2>

                <p className="mt-1 text-gray-600">
                  ${item.price}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Cantidad: {item.quantity}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-white p-6 shadow-md">
          <div className="mb-2 flex justify-between">
            <span className="text-gray-600">
              Productos:
            </span>

            <span className="font-semibold">
              {totalItems}
            </span>
          </div>

          <div className="mb-6 flex justify-between text-xl">
            <span className="font-semibold">
              Total:
            </span>

            <span className="font-bold text-blue-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

         <Link
  href="/checkout"
  className="block w-full rounded-lg bg-green-600 px-6 py-3 text-center font-semibold text-white hover:bg-green-700"
>
  Continuar con la compra
</Link>

          <button
            type="button"
            onClick={clearCart}
            className="mt-3 w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </main>
  );
}