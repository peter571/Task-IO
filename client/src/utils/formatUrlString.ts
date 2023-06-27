export function formatUrlString(word: string) {
  if (!word) return "";
  return word
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "_");
}
