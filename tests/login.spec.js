import { test, expect } from '@playwright/test';
import { LoginPage } from '../utils/login-page.js';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

test('Login to the vent Hub page', async ({ page }) => {
  await page.goto('/');
  const loginPage = new LoginPage(page);
  await loginPage.login(email, password);
});
