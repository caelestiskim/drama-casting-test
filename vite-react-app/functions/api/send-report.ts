interface Env {
  POLAR_ACCESS_TOKEN?: string;
  POLAR_API_BASE?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
}

type Locale = "ko" | "en" | "ja";

type ReportPayload = {
  title: string;
  mainName: string;
  mainTitle: string;
  heroSummary: string;
  oneLiner: string;
  shareCopy: string;
  faceTypeLabel: string;
  matchScore: number;
  vector: Record<string, number>;
  supports: Array<{ name: string; title: string; matchScore: number }>;
  works: Array<{ title: string; note: string }>;
  actors: Array<{ name: string; note: string }>;
  shareUrl?: string;
};

type SendReportBody = {
  email?: string;
  locale?: Locale;
  sessionId?: string;
  report?: ReportPayload;
};

const PAID_STATUSES = new Set(["confirmed", "succeeded", "paid"]);

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function normalizeLocale(locale?: Locale): Locale {
  return locale === "en" || locale === "ja" ? locale : "ko";
}

function getString(value: unknown) {
  return typeof value === "string" ? value : null;
}

function extractCustomerEmail(session: Record<string, unknown>) {
  const direct =
    getString(session.customer_email) ??
    getString(session.customerEmail) ??
    getString(session.email);

  if (direct) return direct;

  const customer = session.customer;
  if (customer && typeof customer === "object") {
    const record = customer as Record<string, unknown>;
    return getString(record.email) ?? getString(record.customer_email);
  }

  return null;
}

async function verifyPaidSession(sessionId: string, env: Env) {
  const token = env.POLAR_ACCESS_TOKEN;
  if (!token) return { isPaid: false, customerEmail: null };

  const apiBase = env.POLAR_API_BASE ?? "https://sandbox-api.polar.sh";
  const res = await fetch(`${apiBase}/v1/checkouts/${encodeURIComponent(sessionId)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.error("[send-report] Polar verification failed:", res.status);
    return { isPaid: false, customerEmail: null };
  }

  const session = (await res.json()) as Record<string, unknown>;
  const status = (session.status as string | undefined) ?? "";
  return {
    isPaid: PAID_STATUSES.has(status),
    customerEmail: extractCustomerEmail(session),
  };
}

function labels(locale: Locale) {
  if (locale === "en") {
    return {
      subject: "Your Drama Casting Test premium report",
      preheader: "Your premium character report is ready.",
      match: "Match",
      impression: "Impression type",
      traits: "Impression profile",
      supports: "Supporting character matches",
      works: "Drama mood references",
      actors: "Actor mood references",
      share: "Open your premium result",
      notice: "Entertainment only. This is not a scientific analysis or diagnosis.",
    };
  }
  if (locale === "ja") {
    return {
      subject: "Drama Casting Test プレミアムレポート",
      preheader: "プレミアムキャラクターレポートをお届けします。",
      match: "一致度",
      impression: "印象タイプ",
      traits: "印象プロフィール",
      supports: "サブキャラクター候補",
      works: "似合う作品ムード",
      actors: "俳優ムードレファレンス",
      share: "プレミアム結果を開く",
      notice: "エンタメ目的のみ。科学的分析や診断ではありません。",
    };
  }
  return {
    subject: "Drama Casting Test 프리미엄 리포트",
    preheader: "프리미엄 캐릭터 리포트를 보내드려요.",
    match: "일치도",
    impression: "인상 유형",
    traits: "인상 프로필",
    supports: "보조 캐릭터 후보",
    works: "어울리는 작품 분위기",
    actors: "배우 무드 레퍼런스",
    share: "프리미엄 결과 열기",
    notice: "오락 목적 전용입니다. 과학적 분석이나 진단이 아닙니다.",
  };
}

function buildEmail(locale: Locale, report: ReportPayload) {
  const t = labels(locale);
  const traitEntries = Object.entries(report.vector ?? {});
  const shareUrl = report.shareUrl ? escapeHtml(report.shareUrl) : "";

  const html = `<!doctype html>
<html>
  <body style="margin:0;background:#f8fafc;font-family:Inter,Arial,sans-serif;color:#0f172a;">
    <div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(t.preheader)}</div>
    <main style="max-width:680px;margin:0 auto;padding:28px 16px;">
      <section style="background:#ffffff;border:1px solid #fbcfe8;border-radius:24px;overflow:hidden;box-shadow:0 18px 60px rgba(236,72,153,.10);">
        <div style="padding:30px;background:linear-gradient(135deg,#fff7fb,#f5f0ff);border-bottom:1px solid #fbcfe8;">
          <p style="margin:0 0 10px;color:#db2777;font-size:12px;font-weight:800;letter-spacing:.18em;">DRAMA CASTING TEST</p>
          <h1 style="margin:0;font-size:30px;line-height:1.2;">${escapeHtml(report.mainName)}</h1>
          <p style="margin:8px 0 0;color:#64748b;font-size:16px;">${escapeHtml(report.mainTitle)}</p>
          <p style="margin:18px 0 0;color:#334155;font-size:16px;line-height:1.7;">${escapeHtml(report.heroSummary)}</p>
        </div>
        <div style="padding:26px;">
          <div style="display:grid;gap:12px;">
            <div style="padding:16px;border:1px solid #e2e8f0;border-radius:18px;background:#f8fafc;">
              <strong>${escapeHtml(t.match)}:</strong> ${escapeHtml(report.matchScore)}%
              <br /><strong>${escapeHtml(t.impression)}:</strong> ${escapeHtml(report.faceTypeLabel)}
            </div>
            <p style="margin:4px 0 0;color:#334155;font-size:15px;line-height:1.7;">${escapeHtml(report.oneLiner)}</p>
          </div>

          <h2 style="margin:26px 0 12px;font-size:18px;">${escapeHtml(t.traits)}</h2>
          <ul style="margin:0;padding:0;list-style:none;">
            ${traitEntries.map(([key, value]) => `
              <li style="margin:0 0 8px;padding:12px 14px;border:1px solid #ede9fe;border-radius:14px;background:#fbfaff;">
                <span style="display:inline-block;min-width:90px;color:#64748b;">${escapeHtml(key)}</span>
                <strong>${escapeHtml(value)}</strong>
              </li>`).join("")}
          </ul>

          <h2 style="margin:26px 0 12px;font-size:18px;">${escapeHtml(t.supports)}</h2>
          ${report.supports.map((item) => `
            <article style="margin:0 0 10px;padding:14px;border:1px solid #ede9fe;border-radius:16px;">
              <strong>${escapeHtml(item.name)}</strong>
              <div style="color:#64748b;font-size:14px;margin-top:4px;">${escapeHtml(item.title)} · ${escapeHtml(item.matchScore)}%</div>
            </article>`).join("")}

          <h2 style="margin:26px 0 12px;font-size:18px;">${escapeHtml(t.works)}</h2>
          ${report.works.map((item) => `
            <article style="margin:0 0 10px;padding:14px;border:1px solid #ffe4e6;border-radius:16px;background:#fff7fa;">
              <strong>${escapeHtml(item.title)}</strong>
              <div style="color:#64748b;font-size:14px;line-height:1.6;margin-top:4px;">${escapeHtml(item.note)}</div>
            </article>`).join("")}

          <h2 style="margin:26px 0 12px;font-size:18px;">${escapeHtml(t.actors)}</h2>
          ${report.actors.map((item) => `
            <article style="margin:0 0 10px;padding:14px;border:1px solid #d1fae5;border-radius:16px;background:#f6fffb;">
              <strong>${escapeHtml(item.name)}</strong>
              <div style="color:#64748b;font-size:14px;line-height:1.6;margin-top:4px;">${escapeHtml(item.note)}</div>
            </article>`).join("")}

          <p style="margin:26px 0 0;padding:14px;border-radius:16px;background:#fff7ed;color:#9a3412;line-height:1.6;">${escapeHtml(report.shareCopy)}</p>
          ${shareUrl ? `<p style="margin:22px 0 0;"><a href="${shareUrl}" style="display:inline-block;padding:13px 18px;border-radius:999px;background:linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899);color:#fff;text-decoration:none;font-weight:700;">${escapeHtml(t.share)}</a></p>` : ""}
          <p style="margin:28px 0 0;color:#94a3b8;font-size:12px;line-height:1.6;">${escapeHtml(t.notice)}</p>
        </div>
      </section>
    </main>
  </body>
</html>`;

  const text = [
    "DRAMA CASTING TEST",
    `${report.mainName} - ${report.mainTitle}`,
    "",
    report.heroSummary,
    report.oneLiner,
    "",
    `${t.match}: ${report.matchScore}%`,
    `${t.impression}: ${report.faceTypeLabel}`,
    "",
    `${t.traits}:`,
    ...traitEntries.map(([key, value]) => `- ${key}: ${value}`),
    "",
    `${t.supports}:`,
    ...report.supports.map((item) => `- ${item.name} (${item.title}) ${item.matchScore}%`),
    "",
    `${t.works}:`,
    ...report.works.map((item) => `- ${item.title}: ${item.note}`),
    "",
    `${t.actors}:`,
    ...report.actors.map((item) => `- ${item.name}: ${item.note}`),
    "",
    report.shareCopy,
    report.shareUrl ? `${t.share}: ${report.shareUrl}` : "",
    "",
    t.notice,
  ].filter(Boolean).join("\n");

  return { subject: t.subject, html, text };
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  if (!env.RESEND_API_KEY) {
    return json({ error: "Resend is not configured" }, 500);
  }

  try {
    const body = (await request.json()) as SendReportBody;
    const sessionId = String(body.sessionId ?? "").trim();

    if (!sessionId) {
      return json({ error: "Missing paid session" }, 400);
    }
    if (!body.report) {
      return json({ error: "Missing report" }, 400);
    }

    const verification = await verifyPaidSession(sessionId, env);
    if (!verification.isPaid) {
      return json({ error: "Payment is not verified" }, 402);
    }

    const requestedEmail = String(body.email ?? "").trim();
    const email = requestedEmail || verification.customerEmail || "";

    if (!isValidEmail(email)) {
      return json({ error: "Customer email is not available" }, 400);
    }

    const locale = normalizeLocale(body.locale);
    const emailContent = buildEmail(locale, body.report);
    const from = env.RESEND_FROM_EMAIL ?? "Drama Casting Test <no-reply@send.dramacastingtest.site>";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[send-report] Resend API error:", res.status, detail.slice(0, 500));
      return json({ error: "Failed to send email" }, 502);
    }

    return json({ ok: true, email });
  } catch (error) {
    console.error("[send-report]", error);
    return json({ error: "Failed to send report" }, 500);
  }
}
