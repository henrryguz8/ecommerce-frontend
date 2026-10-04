"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-center shadow-md">
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          Algo salió mal
        </h2>
        <p className="mb-4 text-gray-600">{error.message}</p>
        <button
          onClick={reset}
          className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    </main>
  );
}