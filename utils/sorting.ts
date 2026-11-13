/**
 * Returns a sorted copy of values; `desc` reverses the order.
 * @param values values to sort (the input array is not modified)
 * @param direction sort direction
 */
export function sorted<T extends string | number>(values: T[], direction: 'asc' | 'desc'): T[] {
  const copy = [...values].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  return direction === 'desc' ? copy.reverse() : copy;
}
