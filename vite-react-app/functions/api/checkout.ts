interface Env {
  POLAR_ACCESS_TOKEN?: string;
  POLAR_PRODUCT_ID?: string;
  POLAR_API_BASE?: string;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  const POLAR_PRODUCT_ID = env.POLAR_PRODUCT_ID ?? "e227714b-0311-4607-93d4-562ed5686b60";
  const POLAR_API_BASE = env.POLAR_API_BASE ?? "https://sandbox-api.polar.sh";

  const token = env.POLAR_ACCESS_TOKEN;
  if (!token) {
    return json({ error: "Polar access token is not configured." }, 500);
  }

  let embedOrigin: string;
  let locale: string;

  try {
    const body = (await request.json()) as { embedOrigin?: string; locale?: string };
    embedOrigin = body.embedOrigin ?? "http://localhost:3000";
    locale = body.locale ?? "ko";
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  const successUrl = `${embedOrigin}/${locale}/result`;

  const polarRes = await fetch(`${POLAR_API_BASE}/v1/checkouts/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_id: POLAR_PRODUCT_ID,
      success_url: successUrl,
    }),
  });

  if (!polarRes.ok) {
    const text = await polarRes.text();
    console.error("[checkout] Polar API error:", polarRes.status, text);
    return json(
      { error: "Failed to create checkout session.", detail: text },
      polarRes.status,
    );
  }

  const session = (await polarRes.json()) as {
    url: string;
    id: string;
    amount: number | null;
    currency: string | null;
  };

  return json({
    url: session.url,
    id: session.id,
    amount: session.amount,
    currency: session.currency,
  });
}
