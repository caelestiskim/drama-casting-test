export const runtime = "edge";

import { NextResponse } from "next/server";

const POLAR_PRODUCT_ID = process.env.POLAR_PRODUCT_ID ?? "e227714b-0311-4607-93d4-562ed5686b60";
const POLAR_API_BASE   = process.env.POLAR_API_BASE   ?? "https://sandbox-api.polar.sh";

export const runtime = "nodejs";

// 상품 가격만 조회 — 체크아웃 세션 생성 없이 가격 표시용
export async function GET() {
  const token = process.env.POLAR_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ amount: null, currency: null }, { status: 200 });
  }

  try {
    const res = await fetch(`${POLAR_API_BASE}/v1/products/${POLAR_PRODUCT_ID}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 }, // 1시간 캐시
    });

    if (!res.ok) {
      return NextResponse.json({ amount: null, currency: null }, { status: 200 });
    }

    const product = (await res.json()) as {
      prices?: Array<{ price_amount: number; price_currency: string }>;
    };

    const first = product.prices?.[0];
    return NextResponse.json({
      amount:   first?.price_amount   ?? null,
      currency: first?.price_currency ?? null,
    });
  } catch {
    return NextResponse.json({ amount: null, currency: null }, { status: 200 });
  }
}
