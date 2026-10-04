import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image_url: string;
};

type ProductsResponse = {
  data: Product[];
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch("http://127.0.0.1:8000/api/products", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  const data: ProductsResponse = await response.json();

  return data.data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          Mi Tienda
        </h1>

        <p className="mb-8 text-gray-600">
          Productos disponibles
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block"
            >
              <article className="overflow-hidden rounded-xl bg-white shadow-md transition hover:scale-[1.02]">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    {product.name}
                  </h2>

                  <p className="mb-4 text-sm text-gray-600">
                    {product.description}
                  </p>

                  <p className="mb-2 text-2xl font-bold text-blue-600">
                    ${product.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    Stock disponible: {product.stock}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}