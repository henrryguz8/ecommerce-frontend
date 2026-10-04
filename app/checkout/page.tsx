"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { createOrder } from "./actions";

export default function CheckoutPage() {
  const { cart, totalItems, totalPrice } = useCart();

  const items = cart.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
  }));

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-white p-8 text-center shadow-md">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Checkout
            </h1>

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
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Confirmar compra
        </h1>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Resumen del pedido
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 pb-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Cantidad: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-gray-900">
                  $
                  {(
                    Number(item.price) * item.quantity
                  ).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="mb-2 flex justify-between">
              <span className="text-gray-600">
                Productos:
              </span>

              <span className="font-semibold">
                {totalItems}
              </span>
            </div>

            <div className="mb-6 flex justify-between text-2xl">
              <span className="font-bold">
                Total:
              </span>

              <span className="font-bold text-blue-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <form action={createOrder}>
              <input
                type="hidden"
                name="items"
                value={JSON.stringify(items)}
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                Crear orden y continuar al pago
              </button>
            </form>

            <Link
              href="/cart"
              className="mt-3 block text-center text-blue-600 hover:underline"
            >
              ← Volver al carrito
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}