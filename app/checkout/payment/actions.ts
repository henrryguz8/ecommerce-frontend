"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL ?? "http://127.0.0.1:8000/api";

function backWithError(orderId: string, message: string): never {
  redirect(
    `/checkout/payment?orderId=${orderId}&error=${encodeURIComponent(message)}`
  );
}

export async function payOrder(formData: FormData) {
  const orderId = String(formData.get("orderId") ?? "");
  const paymentMethod = String(formData.get("paymentMethod") ?? "pm_card_visa");

  const token = (await cookies()).get("auth_token")?.value;
  if (!token) redirect("/login");

  let res: Response;
  let data: any = {};

  try {
    res = await fetch(`${API_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        order_id: Number(orderId),
        payment_method: paymentMethod,
      }),
      cache: "no-store",
    });
    data = await res.json().catch(() => ({}));
  } catch {
    backWithError(orderId, "No se pudo conectar con el servidor.");
  }

  if (!res.ok) {
    backWithError(orderId, data.error ?? data.message ?? "El pago falló.");
  }

  if (data.order?.status !== "paid") {
    backWithError(orderId, "El pago no se completó. Intenta de nuevo.");
  }

  revalidatePath("/orders");
  revalidatePath("/");
  redirect(`/checkout/success?orderId=${orderId}`);
}