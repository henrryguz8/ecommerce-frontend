export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-8 h-8 w-48 rounded bg-gray-300" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-xl bg-gray-200" />
          ))}
        </div>
      </div>
    </main>
  );
}