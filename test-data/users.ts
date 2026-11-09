/**
 * Login test data.
 * SauceDemo credentials are public (shown on the login page of the demo site),
 * so they are safe to keep in the repository. They are still kept here
 * and not hardcoded in the tests, so there is a single place to change them.
 */

export interface User {
  username: string;
  password: string;
}

/** Password shared by all SauceDemo demo users. */
export const PASSWORD = 'secret_sauce';

/** User that can log in and use the shop without any problems. */
export const standardUser: User = {
  username: 'standard_user',
  password: PASSWORD,
};

/** Valid user that is blocked by the application. */
export const lockedOutUser: User = {
  username: 'locked_out_user',
  password: PASSWORD,
};

export interface LoginNegativeCase {
  /** Part of the generated test title, so the report is easy to read. */
  name: string;
  username: string;
  password: string;
  expectedError: string;
}

/** Data for the data-driven negative login test. */
export const loginNegativeCases: LoginNegativeCase[] = [
  {
    name: 'wrong password',
    username: standardUser.username,
    password: 'wrong_password',
    expectedError:
      'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'unknown user',
    username: 'unknown_user',
    password: PASSWORD,
    expectedError:
      'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'locked out user',
    username: lockedOutUser.username,
    password: lockedOutUser.password,
    expectedError: 'Epic sadface: Sorry, this user has been locked out.',
  },
  {
    name: 'empty username',
    username: '',
    password: PASSWORD,
    expectedError: 'Epic sadface: Username is required',
  },
  {
    name: 'empty password',
    username: standardUser.username,
    password: '',
    expectedError: 'Epic sadface: Password is required',
  },
  {
    name: 'both fields empty',
    username: '',
    password: '',
    expectedError: 'Epic sadface: Username is required',
  },
];
