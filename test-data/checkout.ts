/** Checkout test data. */

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/** Complete and valid customer information. */
export const validCustomer: CheckoutInfo = {
  firstName: 'Jan',
  lastName: 'Novak',
  postalCode: '11000',
};

export interface CheckoutNegativeCase {
  /** Part of the generated test title. */
  name: string;
  customer: CheckoutInfo;
  expectedError: string;
}

/** Data for the data-driven negative checkout test (one field is always missing). */
export const checkoutNegativeCases: CheckoutNegativeCase[] = [
  {
    name: 'missing first name',
    customer: { ...validCustomer, firstName: '' },
    expectedError: 'Error: First Name is required',
  },
  {
    name: 'missing last name',
    customer: { ...validCustomer, lastName: '' },
    expectedError: 'Error: Last Name is required',
  },
  {
    name: 'missing postal code',
    customer: { ...validCustomer, postalCode: '' },
    expectedError: 'Error: Postal Code is required',
  },
];

/** Message shown after a successful order. */
export const ORDER_CONFIRMATION = 'Thank you for your order!';
