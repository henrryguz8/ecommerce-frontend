export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-3xl animate-pulse space-y-4">
        <div className="h-8 w-48 rounded bg-gray-300" />
        <div className="h-20 rounded-xl bg-gray-200" />
        <div className="h-20 rounded-xl bg-gray-200" />
      </div>
    </main>
  );
}