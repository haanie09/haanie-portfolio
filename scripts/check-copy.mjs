// Lists every empty "your words" slot and every draft() line left in content/.
import { readFileSync } from "node:fs";

const files = ["site.ts", "notes.ts"];
const empty = [];
const drafts = [];

for (const file of files) {
  const src = readFileSync(new URL(`../content/${file}`, import.meta.url), "utf8");
  src.split("\n").forEach((line, i) => {
    const t = line.trim();
    if (t.startsWith("*") || t.startsWith("/*") || t.startsWith("//") || line.includes("export const")) return;
    const at = `  ${file}:${i + 1}`;
    const s = line.match(/slot\(\s*"([^"]+)",\s*"([^"]+)"\s*\)/);
    if (s) empty.push(`${at}  [${s[1]}] ${s[2]}`);
    const d = line.match(/draft\(\s*"([^"]+)"/);
    if (d) drafts.push(`${at}  ${d[1].slice(0, 90)}${d[1].length > 90 ? "…" : ""}`);
  });
}

console.log(`\nEmpty slots (${empty.length}):\n${empty.join("\n") || "  none"}`);
console.log(`\nDrafts to rewrite in your voice (${drafts.length}):\n${drafts.join("\n") || "  none"}\n`);
if (empty.length === 0 && drafts.length === 0) console.log("All yours. Ready to submit.\n");
