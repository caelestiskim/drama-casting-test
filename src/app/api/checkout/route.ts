import { type NextRequest, NextResponse } from "next/server";

const POLAR_PRODUCT_ID = process.env.POLAR_PRODUCT_ID ?? "e227714b-0311-4607-93d4-562ed5686b60";
// 환경 변수로 sandbox / production 분리
// .env.local:  POLAR_API_BASE=https://sandbox-api.polar.sh   (개발)
// production:  POLAR_API_BASE=https://api.polar.sh           (출시)
const POLAR_API_BASE = process.env.POLAR_API_BASE ?? "https://sandbox-api.polar.sh";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const token = process.env.POLAR_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Polar access token is not configured." },
      { status: 500 },
    );
  }

  let embedOrigin: string;
  let locale: string;

  try {
    const body = (await req.json()) as { embedOrigin?: string; locale?: string };
    embedOrigin = body.embedOrigin ?? "http://localhost:3000";
    locale      = body.locale      ?? "ko";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // success_url: 결제 완료 후 Polar가 리다이렉트할 URL
  // {CHECKOUT_SESSION_ID} 플레이스홀더는 Polar 샌드박스에서 동작하지 않는 경우가 있으므로,
  // 클라이언트에서 세션 ID를 sessionStorage에 직접 저장하는 방식을 병행합니다.
  const successUrl = `${embedOrigin}/${locale}/result`;

  const polarRes = await fetch(`${POLAR_API_BASE}/v1/checkouts/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // embed_origin 제거 — 임베드용 checkout이 아닌 일반 redirect checkout 사용
    body: JSON.stringify({
      product_id:  POLAR_PRODUCT_ID,
      success_url: successUrl,
    }),
  });

  if (!polarRes.ok) {
    const text = await polarRes.text();
    console.error("[checkout] Polar API error:", polarRes.status, text);
    return NextResponse.json(
      { error: "Failed to create checkout session.", detail: text },
      { status: polarRes.status },
    );
  }

  const session = (await polarRes.json()) as {
    url: string;
    id: string;
    amount: number | null;
    currency: string | null;
  };

  return NextResponse.json({
    url:      session.url,
    id:       session.id,
    amount:   session.amount,   // 단위: 센트 (예: 99 → $0.99)
    currency: session.currency, // 예: "usd"
  });
}
