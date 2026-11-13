import { Page, Locator } from '@playwright/test';
import { User } from '../test-data/users';

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorCloseButton: Locator;

  constructor(private readonly page: Page) {
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
    this.errorCloseButton = page.getByTestId('error-button');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async closeError(): Promise<void> {
    await this.errorCloseButton.click();
  }

  async login(user: Pick<User, 'username' | 'password'>): Promise<void> {
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.loginButton.click();
  }
}
