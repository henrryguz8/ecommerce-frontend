"use client";

import { useCart } from "@/context/CartContext";

type AddToCartButtonProps = {
  product: {
    id: number;
    name: string;
    price: string;
    image_url: string;
  };
};

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(product);
    alert(`${product.name} fue agregado al carrito`);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
    >
      Agregar al carrito
    </button>
  );
}