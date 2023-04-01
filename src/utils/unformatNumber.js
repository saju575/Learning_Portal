export function unformatNumber(formattedNumber) {
  const prefixes = ["", "K", "M", "B", "T"];
  const suffix = formattedNumber.slice(-1);
  const base = prefixes.indexOf(suffix);
  const scaled = parseFloat(formattedNumber) * Math.pow(10, base * 3);
  return scaled;
}
