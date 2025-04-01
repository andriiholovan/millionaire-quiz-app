const alphabet: Record<string, string> = Object.fromEntries(
  Array.from({ length: 26 })
    .map((_, index) => String.fromCodePoint(index + 65))
    .map((element, index) => [index, element]),
);

export default function getOptionLabel(id: string): string {
  return alphabet[id];
}
