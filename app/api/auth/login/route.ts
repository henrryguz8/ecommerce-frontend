import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Datos recibidos por Next.js:", body);

    const response = await fetch(
      "http://127.0.0.1:8000/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: body.email,
          password: body.password,
        }),
      }
    );

    const data = await response.json();

    console.log("Respuesta de Laravel:", response.status, data);

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    const nextResponse = NextResponse.json({
      message: data.message,
      user: data.user,
    });

    nextResponse.cookies.set("auth_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return nextResponse;
  } catch (error) {
    console.error("Error en login:", error);

    return NextResponse.json(
      {
        message: "No se pudo conectar con el servidor.",
      },
      { status: 500 }
    );
  }
}