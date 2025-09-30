export function capitalizeWords(text: string): string {
  if (!text?.trim()) {
    return "";
  }

  return text
    .trim()
    .split(/\s+/)
    .map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(" ");
}
