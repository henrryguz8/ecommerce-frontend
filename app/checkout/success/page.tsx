import Link from "next/link";
import ClearCart from "./ClearCart";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <ClearCart />
      <div className="mx-auto max-w-xl rounded-xl bg-white p-8 text-center shadow-md">
        <div className="mb-4 text-5xl">✅</div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          ¡Compra confirmada!
        </h1>
        <p className="mb-6 text-gray-600">
          Tu pago de la orden #{orderId} se procesó correctamente.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/orders"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Ver mis compras
          </Link>
          <Link href="/" className="text-blue-600 hover:underline">
            Seguir comprando
          </Link>
        </div>
      </div>
    </main>
  );
}