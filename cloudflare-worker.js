/**
 * Cloudflare Worker — headers de segurança da Sentinela.
 *
 * Como aplicar (escolha UM método):
 *
 * A) Worker: Workers & Pages → Create → deploy este arquivo em *sentinelacibernetica.com.br/*
 *
 * B) Transform Rules (já em uso): Rules → Transform Rules → Modify Response Header
 *    - Remover: Access-Control-Allow-Origin
 *    - Remover: Content-Security-Policy-Report-Only
 *    - Remover: Age, Expires, x-timer, x-cache, x-cache-hits, x-served-by,
 *      x-fastly-request-id, x-github-request-id, x-github-edge-region,
 *      x-proxy-cache, x-origin-cache, Via
 *    - Definir os headers SET abaixo (substituir o CSP atual).
 *
 * Page Shield: Security → Settings → Client-side security → desligar
 * "Continuous script monitoring" (elimina CSP Report-Only em /cdn-cgi/content).
 */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://formspree.io https://api.web3forms.com",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' https://www.google.com https://t0.gstatic.com https://t1.gstatic.com https://t2.gstatic.com https://t3.gstatic.com",
  "font-src 'self'",
  "connect-src 'self' https://formspree.io https://api.web3forms.com",
  "frame-src 'none'",
  "media-src 'none'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const SET = {
  "Content-Security-Policy": CSP,
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "credentialless",
  "X-Permitted-Cross-Domain-Policies": "none",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
};

const REMOVE = [
  "access-control-allow-origin",
  "access-control-allow-credentials",
  "access-control-allow-methods",
  "access-control-allow-headers",
  "access-control-expose-headers",
  "content-security-policy-report-only",
  "age",
  "expires",
  "x-timer",
  "x-cache",
  "x-cache-hits",
  "x-served-by",
  "x-fastly-request-id",
  "x-github-request-id",
  "x-github-edge-region",
  "x-proxy-cache",
  "x-origin-cache",
  "via",
];

function isAsset(pathname) {
  return /\.(?:css|js|woff2|png|svg|jpg|jpeg|gif|ico|webp|json)$/i.test(pathname);
}

function contentTypeFor(pathname) {
  if (pathname.endsWith(".html") || pathname === "/" || pathname === "") {
    return "text/html; charset=utf-8";
  }
  if (pathname.endsWith(".xml")) return "application/xml; charset=utf-8";
  if (pathname.endsWith(".txt")) return "text/plain; charset=utf-8";
  if (pathname.endsWith(".json")) return "application/json; charset=utf-8";
  if (pathname.endsWith(".css")) return "text/css; charset=utf-8";
  if (pathname.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (pathname.endsWith(".woff2")) return "font/woff2";
  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".svg")) return "image/svg+xml";
  return null;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const originResponse = await fetch(request);
    const headers = new Headers(originResponse.headers);

    for (const name of REMOVE) {
      headers.delete(name);
    }
    for (const [name, value] of Object.entries(SET)) {
      headers.set(name, value);
    }

    const type = contentTypeFor(url.pathname);
    if (type && !headers.get("Content-Type")) {
      headers.set("Content-Type", type);
    }
    if (type && type.startsWith("text/html") && !/charset=/i.test(headers.get("Content-Type") || "")) {
      headers.set("Content-Type", type);
    }
    if (url.pathname.endsWith(".html") || url.pathname === "/") {
      headers.set("Content-Type", "text/html; charset=utf-8");
    }
    if (url.pathname.endsWith("/robots.txt")) {
      headers.set("Content-Type", "text/plain; charset=utf-8");
    }
    headers.delete("etag");
    headers.delete("last-modified");

    if (isAsset(url.pathname)) {
      headers.set("Cache-Control", "public, max-age=86400, must-revalidate");
    } else {
      headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    }

    return new Response(originResponse.body, {
      status: originResponse.status,
      statusText: originResponse.statusText,
      headers,
    });
  },
};
