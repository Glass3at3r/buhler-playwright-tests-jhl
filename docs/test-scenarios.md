# Automation scenarios - Playwright - Buhler

**Description**
Project contains test scenarios created for automated scenario task for Buhler Prague.
Test scenarios are sorted by test priority from high to low.

**Priority rationale**

- **P1 - critical path.** Without these functions the shop cannot be used or sold from: login, adding a product to the cart, completing the order and a correct order total. A failure here blocks the whole business flow, so these scenarios are tested first and on every change.
- **P2 - important.** Negative cases and variations of the main flow: validation of the login and checkout forms, access control, cart manipulation and the state after an order. A failure does not stop the purchase for everybody, but it causes wrong data, confusion or a security gap.
- **P3 - supporting.** Convenience and secondary functionality (sorting, product detail, closing of an error message, logout, navigation back to the shop). A failure is visible, but users can still complete their purchase.

Within the same priority, the scenarios that cover more of the user flow and have the higher business impact are listed first.

**Test scenarios**

|  ID   | Priority | Test scenario                                                        | Test scenario type    |
| :---: | :------: | :------------------------------------------------------------------- | :-------------------- |
| TS-01 |    P1    | Login successful (standard_user)                                     | positive              |
| TS-02 |    P1    | Login with invalid login data / locked_out_user / empty fields       | negative, data-driven |
| TS-03 |    P1    | Adding of product into the cart, checking of badge and cart content. | positive              |
| TS-04 |    P1    | Complete check-out (end-to-end happy day scenario)                   | positive              |
| TS-05 |    P1    | Order summary: item total, tax and total are calculated correctly    | positive              |
| TS-06 |    P2    | Checkout with missing data(name, surname, post office number)        | negative, data-driven |
| TS-07 |    P2    | Removing of product from the cart                                    | positive              |
| TS-08 |    P2    | Adding of multiple products into the cart                            | positive              |
| TS-09 |    P2    | Access to inventory without login                                    | negative              |
| TS-10 |    P2    | State after completed order (empty cart, back to the shop)           | positive              |
| TS-11 |    P2    | Removing of product directly on the inventory page                   | positive              |
| TS-12 |    P2    | Checkout with empty cart (known defect, expected failure)            | negative              |
| TS-17 |    P2    | Proceed from the cart to the checkout form                           | positive              |
| TS-13 |    P3    | Sorting of products (by name, by price)                              | positive              |
| TS-14 |    P3    | Product detail shows correct data                                    | positive              |
| TS-15 |    P3    | Login error message can be closed                                    | positive              |
| TS-16 |    P3    | Logout successful                                                    | positive              |
| TS-18 |    P3    | Return from the cart to the shop (Continue shopping)                 | positive              |

### TS-01 Login successful (P1, positive)

**Precondition:** standard_user can log in.
**Steps:**

1. Open "Sauce Labs Demo URL".
2. Fill the login data (username, password) into login form.
3. Confirm the login by clicking on button "Login".
4. Check that standard_user is successfully logged in and if Inventory page is displayed.
   **Expected result:**

- Login with standard_user is successful.
- Inventory page is displayed.

### TS-02 Login with invalid login data (P1, negative, data-driven)

**Precondition:** Login page is opened.
**Steps:**

1. Fill the login form with data from the data set (wrong password, unknown user, locked_out_user, empty username, empty password, both empty).
2. Click on button "Login".
   **Expected result:**

- Error message with the expected text is displayed (differs per data set).
- User stays on the login page.

### TS-03 Adding of product into the cart (P1, positive)

**Precondition:** standard_user is logged in, Inventory page is displayed.
**Steps:**

1. Click "Add to cart" on the product (Sauce Labs Backpack).
2. Open the cart.
   **Expected result:**

- Cart badge shows 1.
- Cart contains exactly one item with the expected name and price.

### TS-04 Complete checkout (P1, positive)

**Precondition:** standard_user is logged in, cart contains a product.
**Steps:**

1. Proceed from the cart to checkout.
2. Fill valid first name, last name and postal code, click "Continue".
3. Click "Finish" on the overview page.
   **Expected result:**

- Overview page is displayed before finishing the order.
- Confirmation "Thank you for your order!" is displayed.

### TS-05 Order summary prices (P1, positive)

**Precondition:** standard_user is logged in, cart contains a product, checkout form is opened.
**Steps:**

1. Fill valid customer data and click "Continue".
2. Read item total, tax and total from the overview page.
   **Expected result:**

- Item total equals the price of the product.
- Tax is greater than 0.
- Total equals item total + tax.

### TS-06 Checkout with missing data (P2, negative, data-driven)

**Precondition:** standard_user is logged in, cart contains a product.
**Steps:**

1. Proceed from the cart to checkout.
2. Fill the form with one mandatory field missing (first name, last name or postal code).
3. Click "Continue".
   **Expected result:**

- Error message with the name of the missing field is displayed.
- User stays on the checkout form.

### TS-07 Removing of product from the cart (P2, positive)

**Precondition:** standard_user is logged in, cart contains a product.
**Steps:**

1. Click "Remove" on the product in the cart.
   **Expected result:**

- Cart is empty.
- Cart badge disappears.

### TS-08 Adding of multiple products into the cart (P2, positive)

**Precondition:** standard_user is logged in, Inventory page is displayed.
**Steps:**

1. Click "Add to cart" on Sauce Labs Backpack and on Sauce Labs Bike Light.
2. Open the cart.
   **Expected result:**

- Cart badge shows 2.
- Cart contains both products, in the order they were added, with correct prices.

### TS-09 Access to inventory without login (P2, negative)

**Precondition:** user is not logged in.
**Steps:**

1. Open the URL /inventory.html directly.
   **Expected result:**

- Login page is displayed with the error "You can only access '/inventory.html' when you are logged in."
- Inventory page is not displayed.

### TS-10 State after completed order (P2, positive)

**Precondition:** standard_user is logged in, cart contains a product.
**Steps:**

1. Complete the checkout (fill valid data, click "Continue", click "Finish").
2. Check the cart badge.
3. Click "Back Home".
   **Expected result:**

- Cart badge is not displayed on the confirmation page nor on the Inventory page.
- Inventory page is displayed.

### TS-11 Removing of product on the inventory page (P2, positive)

**Precondition:** standard_user is logged in, Inventory page is displayed.
**Steps:**

1. Click "Add to cart" on Sauce Labs Backpack.
2. Click "Remove" on the same product.
   **Expected result:**

- After step 1 the button changes to "Remove" and the cart badge shows 1.
- After step 2 the button changes back to "Add to cart" and the cart badge disappears.

### TS-12 Checkout with empty cart (P2, negative)

**Precondition:** standard_user is logged in, cart is empty.
**Steps:**

1. Open the cart.
2. Click "Checkout".
   **Expected result:**

- Checkout is not allowed, the checkout form is not displayed.

**Known defect:** SauceDemo lets the user continue to the checkout form with an empty cart. The test describes the expected behavior and is marked `test.fail()`, so the suite stays green; when the application is fixed, the test starts failing and the mark has to be removed.

### TS-17 Proceed from the cart to the checkout form (P2, positive)

**Precondition:** standard_user is logged in, cart contains a product.
**Steps:**

1. Open the cart.
2. Click "Checkout".
   **Expected result:**

- Checkout form (first name, last name, postal code) is displayed.
- Cart badge still shows 1.

### TS-13 Sorting of products (P3, positive, data-driven)

**Precondition:** standard_user is logged in, Inventory page is displayed.
**Steps:**

1. Select a sorting option (Name A-Z, Name Z-A, Price low-high, Price high-low).
   **Expected result:**

- Products are displayed in the selected order.

### TS-14 Product detail (P3, positive)

**Precondition:** standard_user is logged in, Inventory page is displayed.
**Steps:**

1. Click on the name of Sauce Labs Backpack.
2. Click "Back to products".
   **Expected result:**

- Product detail is displayed with the same name and price as in the list, and a description.
- Inventory page is displayed after returning.

### TS-15 Closing of login error message (P3, positive)

**Precondition:** Login page is opened.
**Steps:**

1. Click "Login" with empty fields.
2. Click the close icon (X) on the error message.
   **Expected result:**

- Error message is displayed after step 1.
- Error message disappears after step 2.

### TS-16 Logout successful (P3, positive)

**Precondition:** standard_user is logged in.
**Steps:**

1. Open the side menu.
2. Click "Logout".
   **Expected result:**

- Login page is displayed.

### TS-18 Return from the cart to the shop (P3, positive)

**Precondition:** standard_user is logged in, cart contains a product.
**Steps:**

1. Open the cart.
2. Click "Continue Shopping".
   **Expected result:**

- Inventory page is displayed.
