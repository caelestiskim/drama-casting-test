interface Env {
  POLAR_ACCESS_TOKEN?: string;
  POLAR_API_BASE?: string;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// GET /api/verify-payment?session_id=xxx
export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  const POLAR_API_BASE = env.POLAR_API_BASE ?? "https://sandbox-api.polar.sh";

  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId || typeof sessionId !== "string") {
    return json({ isPaid: false, error: "Missing session_id" }, 400);
  }

  const token = env.POLAR_ACCESS_TOKEN;
  if (!token) {
    return json({ isPaid: false, error: "Polar not configured" }, 500);
  }

  try {
    const res = await fetch(`${POLAR_API_BASE}/v1/checkouts/${sessionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.error("[verify-payment] Polar API error:", res.status);
      return json({ isPaid: false });
    }

    const session = (await res.json()) as Record<string, unknown>;
    const status = (session.status as string | undefined) ?? "unknown";

    const PAID_STATUSES = new Set(["confirmed", "succeeded", "paid"]);
    const isPaid = PAID_STATUSES.has(status);

    console.log("[verify-payment] checkout id:", sessionId, "| status:", status, "| isPaid:", isPaid);

    return json({ isPaid, status });
  } catch (err) {
    console.error("[verify-payment]", err);
    return json({ isPaid: false });
  }
}
