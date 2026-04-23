import { type NextRequest, NextResponse } from "next/server";

const POLAR_API_BASE = process.env.POLAR_API_BASE ?? "https://sandbox-api.polar.sh";

export const runtime = "nodejs";

/**
 * GET /api/verify-payment?session_id=xxx
 *
 * Polar checkout 세션 ID를 서버에서 검증합니다.
 * ?paid=1 URL 파라미터 직접 조작으로 프리미엄을 우회하는 것을 방지합니다.
 *
 * Polar checkout status:
 *   "open"       — 결제 페이지 열림 (미완료)
 *   "confirmed"  — 구매자가 확인 (완료 중)
 *   "succeeded"  — 결제 완료 ✅
 *   "failed"     — 실패
 *   "expired"    — 만료
 */
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json({ isPaid: false, error: "Missing session_id" }, { status: 400 });
  }

  const token = process.env.POLAR_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ isPaid: false, error: "Polar not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(`${POLAR_API_BASE}/v1/checkouts/${sessionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.error("[verify-payment] Polar API error:", res.status);
      return NextResponse.json({ isPaid: false }, { status: 200 });
    }

    const session = (await res.json()) as Record<string, unknown>;
    const status  = (session.status as string | undefined) ?? "unknown";

    // Polar checkout 완료 상태: "confirmed" (v1 API 기준)
    // "succeeded"는 결제 완료된 order의 상태이므로 함께 허용
    const PAID_STATUSES = new Set(["confirmed", "succeeded", "paid"]);
    const isPaid = PAID_STATUSES.has(status);

    console.log("[verify-payment] checkout id:", req.nextUrl.searchParams.get("session_id"), "| status:", status, "| isPaid:", isPaid);

    return NextResponse.json({ isPaid, status });
  } catch (err) {
    console.error("[verify-payment]", err);
    return NextResponse.json({ isPaid: false }, { status: 200 });
  }
}
