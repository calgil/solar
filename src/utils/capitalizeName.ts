export function capitalizeName(name: string | undefined) {
  if (!name) return;
  return name.charAt(0).toUpperCase() + name.slice(1);
}
