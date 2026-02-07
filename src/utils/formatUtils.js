export function formatTypeLabel(shortLabel) {
  if (!shortLabel) return "";
  const trimmed = String(shortLabel).trim();
  if (trimmed === "лек.") return "лекція";
  if (trimmed === "сем.") return "семінар";
  if (trimmed === "практ.") return "практ.";
  if (trimmed === "лаб.") return "лаб.";
  return trimmed;
}

export function getTypePillClass(label) {
  const full = formatTypeLabel(label);
  if (full === "лекція") return "type-pill--lecture";
  if (full === "семінар") return "type-pill--seminar";
  if (full === "практ.") return "type-pill--practice";
  if (full === "лаб.") return "type-pill--lab";
  return "";
}
