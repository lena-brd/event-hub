class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator('#email');
    this.password = page.locator('#password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signInButton.click();

    await this.page.waitForLoadState('networkidle');
  }
}

export { LoginPage };
