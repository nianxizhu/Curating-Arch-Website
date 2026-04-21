import fs from "node:fs";
import path from "node:path";

const out = path.resolve("public/artifacts");
fs.mkdirSync(out, { recursive: true });

const artifacts = [
  { id: 1, label: "PLANS TO RELIEVE CONGESTION", sub: "NYT · 1911", tone: "sepia" },
  { id: 2, label: "REGISTRY ROOM", sub: "Ellis Island · c.1905", tone: "photo" },
  { id: 3, label: "GUGGENHEIM RECEPTION", sub: "Wright · 1943–56", tone: "pencil" },
  { id: 4, label: "TURNSTILE PATENT", sub: "USPTO · 1928", tone: "blueprint" },
  { id: 5, label: "TENEMENT STOOP", sub: "Riis · c.1890", tone: "photo" },
  { id: 6, label: "PORT AUTHORITY", sub: "Photograph · 1963", tone: "photo" },
  { id: 7, label: "WELFARE OFFICE", sub: "NYC DSS · 1974", tone: "photo" },
  { id: 8, label: "STUDIO 54 ROPE", sub: "Photograph · 1978", tone: "photo" },
  { id: 9, label: "HERALD SQUARE DMV", sub: "Photograph · 1989", tone: "photo" },
  { id: 10, label: "BELLEVUE ER", sub: "Photograph · 1995", tone: "photo" },
  { id: 11, label: "APPLE STORE LINE", sub: "Photograph · 2007", tone: "photo" },
  { id: 12, label: "COVID TESTING TENT", sub: "Photograph · 2020", tone: "photo" },
];

const palettes = {
  sepia: { bg: "#d4bc8c", ink: "#3a2614", frame: "#7a5530", accent: "#a07e48" },
  photo: { bg: "#bfb7a8", ink: "#1c1a18", frame: "#2d2a24", accent: "#7e7568" },
  pencil: { bg: "#d6d2c6", ink: "#2a2824", frame: "#65615a", accent: "#8c8880" },
  blueprint: { bg: "#2b496d", ink: "#e4eef7", frame: "#c7d9ec", accent: "#7fa8cd" },
};

function noiseRects(palette, n = 60) {
  const rects = [];
  for (let i = 0; i < n; i++) {
    const x = Math.floor(Math.random() * 900) + 30;
    const y = Math.floor(Math.random() * 600) + 30;
    const w = Math.floor(Math.random() * 20) + 2;
    const h = Math.floor(Math.random() * 2) + 1;
    const o = (Math.random() * 0.12 + 0.02).toFixed(2);
    rects.push(
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${palette.ink}" opacity="${o}"/>`
    );
  }
  return rects.join("\n    ");
}

function mainSvg(item, w = 960, h = 660) {
  const p = palettes[item.tone];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-label="${item.label} placeholder">
  <rect width="${w}" height="${h}" fill="${p.bg}"/>
  <rect x="20" y="20" width="${w - 40}" height="${h - 40}" fill="none" stroke="${p.frame}" stroke-width="2"/>
  <g opacity="0.7">
    ${noiseRects(p, 120)}
  </g>
  <g transform="translate(${w / 2}, ${h / 2 - 30})" text-anchor="middle" font-family="Helvetica, Arial, sans-serif">
    <text font-size="14" letter-spacing="6" fill="${p.accent}" y="-40">ARTIFACT ${String(item.id).padStart(2, "0")}</text>
    <text font-size="42" font-weight="800" fill="${p.ink}" y="10" letter-spacing="-0.5">${item.label}</text>
    <text font-size="14" fill="${p.accent}" y="50" letter-spacing="3">${item.sub}</text>
  </g>
  <g transform="translate(${w / 2}, ${h - 60})" text-anchor="middle" font-family="Helvetica, Arial, sans-serif">
    <text font-size="10" letter-spacing="4" fill="${p.frame}" opacity="0.6">PLACEHOLDER</text>
  </g>
</svg>
`;
}

function thumbSvg(item, variant, w = 220, h = 160) {
  const p = palettes[item.tone];
  const shift = variant * 7;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="${p.bg}"/>
  <rect x="8" y="8" width="${w - 16}" height="${h - 16}" fill="none" stroke="${p.frame}" stroke-width="1"/>
  <g opacity="0.6">
    ${noiseRects(p, 35)}
  </g>
  <g transform="translate(${w / 2}, ${h / 2})" text-anchor="middle" font-family="Helvetica, Arial, sans-serif">
    <text font-size="10" letter-spacing="3" fill="${p.accent}" y="-4">ALT ${variant}</text>
    <text font-size="14" font-weight="700" fill="${p.ink}" y="14">${String(item.id).padStart(2, "0")}.${variant}</text>
  </g>
</svg>
`;
}

for (const item of artifacts) {
  const id = String(item.id).padStart(2, "0");
  fs.writeFileSync(path.join(out, `${id}-main.svg`), mainSvg(item));
  fs.writeFileSync(path.join(out, `${id}-alt-1.svg`), thumbSvg(item, 1));
  fs.writeFileSync(path.join(out, `${id}-alt-2.svg`), thumbSvg(item, 2));
}

console.log(`Generated ${artifacts.length * 3} placeholder SVGs in ${out}`);
