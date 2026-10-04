import AddToCartButton from "./AddToCartButton";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image_url: string;
};

async function getProduct(id: string): Promise<Product> {
  const response = await fetch(
    `http://127.0.0.1:8000/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener el producto");
  }

  const data: Product = await response.json();

  return data;
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <a
          href="/"
          className="mb-6 inline-block text-blue-600 hover:underline"
        >
          ← Volver a productos
        </a>

        <div className="overflow-hidden rounded-xl bg-white shadow-md md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full min-h-80 w-full object-cover"
            />
          </div>

          <div className="p-8 md:w-1/2">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            <p className="mb-6 text-gray-600">
              {product.description}
            </p>

            <p className="mb-4 text-3xl font-bold text-blue-600">
              ${product.price}
            </p>

            <p className="mb-6 text-gray-500">
              Stock disponible: {product.stock}
            </p>

           <AddToCartButton
  product={{
    id: product.id,
    name: product.name,
    price: product.price,
    image_url: product.image_url,
  }}
/>
          </div>
        </div>
      </div>
    </main>
  );
}