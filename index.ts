const ALLOWED_ORIGINS = new Set([
  "https://paroglumedia.com",
  "https://www.paroglumedia.com",
  "https://paroglu.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
]);

const buckets = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;

function cors(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://paroglumedia.com";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
  };
}
function json(data: unknown, status = 200, origin: string | null = null) {
  return new Response(JSON.stringify(data), { status, headers: cors(origin) });
}
function limited(req: Request) {
  const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.reset < now) { buckets.set(ip, { count: 1, reset: now + WINDOW_MS }); return false; }
  b.count += 1; return b.count > MAX_PER_WINDOW;
}
async function supabaseGet(path: string) {
  const base = Deno.env.get("SUPABASE_URL") || "";
  const key = Deno.env.get("SB_PUBLISHABLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "sb_publishable_Iw6pzaVdawQRcywU8zGTOQ_C546lPla";
  if (!base || !key) return [];
  const res = await fetch(`${base}/rest/v1/${path}`, { headers: { apikey: key, Accept: "application/json" } });
  return res.ok ? await res.json() : [];
}
function outputText(data: any) {
  if (data?.output_text) return data.output_text;
  return (data?.output || []).flatMap((x: any) => x?.content || []).filter((x: any) => x?.type === "output_text").map((x: any) => x.text).join("\n");
}
Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(origin) });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, origin);
  if (origin && !ALLOWED_ORIGINS.has(origin)) return json({ error: "Origin not allowed" }, 403, origin);
  if (limited(req)) return json({ error: "Çok fazla istek. Lütfen biraz sonra tekrar deneyin." }, 429, origin);

  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) return json({ error: "AI yapılandırması eksik." }, 500, origin);
  let body: any;
  try { body = await req.json(); } catch { return json({ error: "Geçersiz istek." }, 400, origin); }
  const message = String(body?.message || "").trim().slice(0, 1500);
  const history = Array.isArray(body?.history) ? body.history.slice(-8) : [];
  const page = String(body?.page || "/").slice(0, 200);
  if (!message) return json({ error: "Mesaj boş." }, 400, origin);

  const [projects, brands, content] = await Promise.all([
    supabaseGet("projects?select=title,client,category,tags,description,project_url,year&published=eq.true&order=featured.desc,sort_order.asc&limit=24"),
    supabaseGet("brands?select=name,sector,url&visible=eq.true&order=sort_order.asc&limit=32"),
    supabaseGet("site_content?select=key,value&limit=100"),
  ]);
  const projectText = (projects || []).map((p: any) => `- ${p.title}${p.client ? ` / ${p.client}` : ""}${p.category ? ` [${p.category}]` : ""}${p.tags ? ` — ${p.tags}` : ""}`).join("\n");
  const brandText = (brands || []).map((b: any) => b.name).join(", ");
  const siteData = Object.fromEntries((content || []).map((x: any) => [x.key, x.value]));

  const instructions = `Sen Paroglu Media web sitesindeki resmi yapay zekâ asistansın. Paroglu Media, Umut Paroğlu'nun kreatif markasıdır.\n\nHizmetler: Video/Reels, fotoğraf, grafik tasarım, sosyal medya, drone, kreatif prodüksiyon ve web/dijital.\n\nTürkçe, kısa, profesyonel ve samimi cevap ver. Genellikle 2-5 cümle yeterli. Bilmediğin fiyat, süre veya müsaitliği uydurma. Proje yaptırmak isteyen kullanıcıyı gerektiğinde Teklif Al sayfasına yönlendir. Portfolyoda olmayan işi yapılmış gibi söyleme. Site dışı alakasız sorularda Paroglu Media hizmetlerine yardımcı olduğunu belirt.\n\nSayfa: ${page}\nİletişim: ${siteData["contact.email"] || "umutparoglu87@gmail.com"} · ${siteData["contact.phone"] || "+90 541 662 98 62"}\n\nPortfolyo:\n${projectText || "Henüz portfolyo verisi yok."}\n\nReferanslar:\n${brandText || "Henüz marka verisi yok."}`;
  const input = [...history.map((m: any) => ({ role: m.role === "assistant" ? "assistant" : "user", content: String(m.content || "").slice(0, 800) })), { role: "user", content: message }];
  const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: "gpt-6-luna", instructions, input, max_output_tokens: 420, store: false }) });
  const data = await response.json();
  if (!response.ok) { console.error("OpenAI error", data); return json({ error: "Yapay zekâ şu anda yanıt veremedi." }, 502, origin); }
  return json({ reply: outputText(data)?.trim() || "Şu anda cevap oluşturamadım." }, 200, origin);
});
