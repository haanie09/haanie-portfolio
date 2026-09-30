// Lists every empty "your words" slot and every draft() line left in content/site.ts.
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../content/site.ts", import.meta.url), "utf8");
const lines = src.split("\n");
const empty = [];
const drafts = [];

lines.forEach((line, i) => {
  const t = line.trim();
  if (t.startsWith("*") || t.startsWith("/*") || t.startsWith("//") || line.includes("export const")) return;
  const s = line.match(/slot\(\s*"([^"]+)",\s*"([^"]+)"\s*\)/);
  if (s) empty.push(`  line ${i + 1}  [${s[1]}] ${s[2]}`);
  const d = line.match(/draft\(\s*"([^"]+)"/);
  if (d) drafts.push(`  line ${i + 1}  ${d[1].slice(0, 90)}${d[1].length > 90 ? "…" : ""}`);
});

console.log(`\nEmpty slots (${empty.length}):\n${empty.join("\n") || "  none"}`);
console.log(`\nDrafts to rewrite in your voice (${drafts.length}):\n${drafts.join("\n") || "  none"}\n`);
if (empty.length === 0 && drafts.length === 0) console.log("All yours. Ready to submit.\n");
