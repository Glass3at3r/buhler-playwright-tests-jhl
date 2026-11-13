/**
 * Converts price text to a number, e.g. "$29.99" -> 29.99, "Item total: $29.99" -> 29.99.
 * @param text text containing exactly one price
 */
export function parsePrice(text: string): number {
  const match = text.match(/\d+(?:\.\d+)?/);
  if (match === null) {
    throw new Error(`No price found in text "${text}"`);
  }
  return Number(match[0]);
}
