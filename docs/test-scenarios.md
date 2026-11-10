# Automation scenarios - Playwright - Buhler

**Description**
Project contains test scenarios created for automated scenario task for Buhler Prague.
Test scenarios are sorted by test priority from high to low. 

**Test scenarios**
| Priority | Test scenario   | Test scenario type                      |
|:---------:|:----------------:|:-----------------------------------:|
| P1        | Login successful (standard_user) | positive |
| P1        | Login with invalid login data / locked_out_user / empty fields  | negative, data-driven |
| P1        | Adding of product into the cart, checking of badge and cart content. | positive |
| P1        | Complete check-out (end-to-end happy day scenario) | positive |
| P2        | Checkout with missing data(name, surname, post office number) | negative, data-driven |
| P2        | Removing of product from the cart | positive |
| P3        | Sorting of products (by name, by price) | positive |
| P3        | Logout successful | positive |


