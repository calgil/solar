export function capitalizeName(name: string | undefined) {
  if (!name) return;
  const words = name.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
}
