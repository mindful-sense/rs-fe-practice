export function capitalizeWords(sentence: string): string | null {
  if (typeof sentence !== "string" || !sentence.trim()) {
    return null;
  }

  const words = sentence.trim().split(/\s+/);
  const capitalizedWords = words.map(
    (word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`,
  );

  return capitalizedWords.join(" ");
}
