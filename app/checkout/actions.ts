"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type OrderItem = {
  product_id: number;
  quantity: number;
};

export async function createOrder(formData: FormData) {
  const itemsJson = formData.get("items");

  if (!itemsJson || typeof itemsJson !== "string") {
    throw new Error("No se encontraron productos en el carrito.");
  }

  const items: OrderItem[] = JSON.parse(itemsJson);

  if (items.length === 0) {
    throw new Error("El carrito está vacío.");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await fetch(
    "http://127.0.0.1:8000/api/orders",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "No se pudo crear la orden."
    );
  }

  revalidatePath("/orders");
  revalidatePath("/");

  const orderId = data.id ?? data.order?.id ?? data.data?.id;

if (!orderId) {
  throw new Error("La orden se creó pero no se recibió su ID.");
}

redirect(`/checkout/payment?orderId=${orderId}`);
}