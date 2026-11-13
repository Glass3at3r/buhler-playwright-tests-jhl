# Automation scenarios - Playwright - Buhler

**Description**
Project contains test scenarios created for automated scenario task for Buhler Prague.
Test scenarios are sorted by test priority from high to low.

**Test scenarios**

| ID | Priority | Test scenario | Test scenario type |
| :------: | :------------------------------------------------------------------: | :-------------------: |
| TS-01 | P1 | Login successful (standard_user) | positive |
| TS-02 | P1 | Login with invalid login data / locked_out_user / empty fields | negative, data-driven |
| TS-03 | P1 | Adding of product into the cart, checking of badge and cart content. | positive |
| TS-04 | P1 | Complete check-out (end-to-end happy day scenario) | positive |
| TS-05 | P2 | Checkout with missing data(name, surname, post office number) | negative, data-driven |
| TS-06| P2 | Removing of product from the cart | positive |
| TS-07 | P3 | Sorting of products (by name, by price) | positive |
| TS-08 | P3 | Logout successful | positive |

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

### TS-02 Login with invalid login data (P1, negative)

### TS-03 Adding of product into the cart (P1, positive)

### TS-04 Complete checkout (P1, positive)

### TS-05 Checkout with missing data (P2, negative)

### TS-06 Removing of product from the cart (P2, positive)

### TS-07 Sorting of products (P3, positive)

### TS-08 Logout successful (P3, positive)
