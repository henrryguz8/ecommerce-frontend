import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { payOrder } from "./actions";

const API_URL = process.env.API_URL ?? "http://127.0.0.1:8000/api";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; error?: string }>;
}) {
  const { orderId, error } = await searchParams;
  if (!orderId) redirect("/cart");

  const token = (await cookies()).get("auth_token")?.value;
  if (!token) redirect("/login");

  let total: number | null = null;
  try {
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      const order = json.data ?? json.order ?? json;
      total = Number(order.total);
    }
  } catch {}

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Pago</h1>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <p className="mb-1 text-gray-600">Orden #{orderId}</p>
          {total !== null && !Number.isNaN(total) && (
            <p className="mb-6 text-3xl font-bold text-blue-600">
              ${total.toFixed(2)}
            </p>
          )}

          {error && (
            <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form action={payOrder} className="space-y-4">
            <input type="hidden" name="orderId" value={orderId} />

            <label className="block text-sm font-medium text-gray-700">
              Tarjeta de prueba (Stripe)
            </label>
            <select
              name="paymentMethod"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
              defaultValue="pm_card_visa"
            >
              <option value="pm_card_visa">Visa (aprobada)</option>
              <option value="pm_card_mastercard">Mastercard (aprobada)</option>
              <option value="pm_card_chargeDeclined">Tarjeta rechazada</option>
              <option value="pm_card_chargeDeclinedInsufficientFunds">
                Fondos insuficientes
              </option>
            </select>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Pagar ahora
            </button>
          </form>

          <Link
            href="/orders"
            className="mt-4 block text-center text-blue-600 hover:underline"
          >
            Pagar más tarde
          </Link>
        </div>
      </div>
    </main>
  );
}