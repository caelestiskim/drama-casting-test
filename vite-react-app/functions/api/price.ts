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

// GET /api/price — 상품 가격 조회
export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { env } = context;

  const POLAR_PRODUCT_ID = env.POLAR_PRODUCT_ID ?? "e227714b-0311-4607-93d4-562ed5686b60";
  const POLAR_API_BASE = env.POLAR_API_BASE ?? "https://sandbox-api.polar.sh";

  const token = env.POLAR_ACCESS_TOKEN;
  if (!token) {
    return json({ amount: null, currency: null });
  }

  try {
    const res = await fetch(`${POLAR_API_BASE}/v1/products/${POLAR_PRODUCT_ID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return json({ amount: null, currency: null });
    }

    const product = (await res.json()) as {
      prices?: Array<{ price_amount: number; price_currency: string }>;
    };

    const first = product.prices?.[0];
    return json({
      amount: first?.price_amount ?? null,
      currency: first?.price_currency ?? null,
    });
  } catch {
    return json({ amount: null, currency: null });
  }
}
