export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-xl animate-pulse space-y-4">
        <div className="h-8 w-40 rounded bg-gray-300" />
        <div className="h-48 rounded-xl bg-gray-200" />
      </div>
    </main>
  );
}