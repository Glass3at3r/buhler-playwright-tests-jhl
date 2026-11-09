/** Products available in the SauceDemo catalogue (prices in USD). */

export interface Product {
  name: string;
  price: number;
}

export const backpack: Product = { name: 'Sauce Labs Backpack', price: 29.99 };
export const bikeLight: Product = { name: 'Sauce Labs Bike Light', price: 9.99 };
export const boltTShirt: Product = { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 };

/** Total number of products shown on the inventory page. */
export const TOTAL_PRODUCTS = 6;

export interface SortCase {
  /** `value` attribute of the option in the sort dropdown. */
  option: 'az' | 'za' | 'lohi' | 'hilo';
  /** Human readable label, used in the test title. */
  label: string;
  /** What the products are sorted by. */
  by: 'name' | 'price';
  direction: 'asc' | 'desc';
}

/** Data for the data-driven sorting test. */
export const sortCases: SortCase[] = [
  { option: 'az', label: 'Name (A to Z)', by: 'name', direction: 'asc' },
  { option: 'za', label: 'Name (Z to A)', by: 'name', direction: 'desc' },
  { option: 'lohi', label: 'Price (low to high)', by: 'price', direction: 'asc' },
  { option: 'hilo', label: 'Price (high to low)', by: 'price', direction: 'desc' },
];
