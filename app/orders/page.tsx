import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL ?? "http://127.0.0.1:8000/api";

async function OrdersList({ token }: { token: string }) {
  const res = await fetch(`${API_URL}/orders`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401) redirect("/login");
  if (!res.ok) throw new Error("No se pudieron cargar tus órdenes.");

  const json = await res.json();
  const orders: any[] = Array.isArray(json) ? json : json.data ?? [];

  if (orders.length === 0) {
    return <p className="text-gray-600">Aún no tienes compras.</p>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between rounded-xl bg-white p-5 shadow-md"
        >
          <div>
            <p className="font-semibold text-gray-900">Orden #{order.id}</p>
            <p className="text-sm text-gray-500">
              {order.created_at
                ? new Date(order.created_at).toLocaleString()
                : ""}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-blue-600">
              ${Number(order.total ?? 0).toFixed(2)}
            </p>
            <p className="text-sm capitalize text-gray-600">{order.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function OrdersPage() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) redirect("/login");

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Mis compras
        </h1>

        <Suspense
          fallback={<p className="text-gray-500">Cargando órdenes...</p>}
        >
          <OrdersList token={token} />
        </Suspense>

        <Link href="/" className="mt-6 block text-blue-600 hover:underline">
          ← Volver al catálogo
        </Link>
      </div>
    </main>
  );
}