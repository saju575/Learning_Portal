export function formatNumberToShorter(number) {
  const prefixes = ["", "K", "M", "B", "T"];
  let base = Math.floor(Math.log10(Math.abs(number)) / 3);
  if (base >= prefixes.length) {
    base = prefixes.length - 1;
  }
  const scaled = number / Math.pow(10, base * 3);
  const formatted = scaled.toFixed(2) + prefixes[base];
  return formatted;
}
