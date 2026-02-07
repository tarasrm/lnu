export function formatTypeLabel(shortLabel) {
  if (!shortLabel) return "";
  const trimmed = String(shortLabel).trim();
  if (trimmed === "лек.") return "лекція";
  if (trimmed === "сем.") return "семінар";
  return trimmed;
}

export function getTypePillClass(label) {
  const full = formatTypeLabel(label);
  if (full === "лекція") return "type-pill--lecture";
  if (full === "семінар") return "type-pill--seminar";
  return "";
}
