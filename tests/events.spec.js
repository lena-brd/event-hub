import { test, expect } from '@playwright/test';
import { LoginPage } from '../utils/login-page.js';
import { CreateEvent } from '../utils/creating-events.js';
import { BookingEvent } from '../utils/book-event.js';
require('dotenv').config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

let eventName = `Music Event in Bratislava - ${Date.now()}`;

async function createCardEvent(page) {
  const createEvent = new CreateEvent(page);
  await createEvent.newEvent(
    eventName,
    'Bratislava',
    'Roast Different Festival, Vlcie hrdlo',
    '2027-05-28T14:53',
    '50',
    '100',
  );
  await expect(page.getByText('Event created!')).toBeVisible();
}

test.describe('The events from Event Hub page', () => {
  test.beforeEach(async ({ page }) => {
    console.log('Email loaded:', email ? 'Yes' : 'No (undefined)');
    console.log('Password loaded:', password ? 'Yes' : 'No (undefined)');
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(email, password);

    await page.locator('#nav-events').click();
    await expect(page).toHaveURL('/events');
  });

  test('verify that can create new event', async ({ page }) => {
    await createCardEvent(page);
  });

  test('Verify that can book the created event', async ({ page }) => {
    await createCardEvent(page);

    await page.locator('#nav-events').click();
    await page.waitForLoadState('networkidle');

    const booking = new BookingEvent(page);
    await booking.findFirstEventCreated(eventName);
    await booking.fillBookingForm(
      'John Doe',
      'example@example.com',
      '919876543210',
    );
    await booking.referenceID();
  });

  test('Verify that can cancel the event created', async ({ page }) => {
    eventName = `Music Event in Bratislava - ${Date.now()}`;
    await createCardEvent(page);

    await page.locator('#nav-events').click();
    await page.waitForLoadState('networkidle');

    const booking = new BookingEvent(page);
    await booking.findFirstEventCreated(eventName);

    await booking.fillBookingForm(
      'John Doe',
      'example@example.com',
      '919876543210',
    );
    await booking.referenceID();
    await booking.cancelEvent();
  });
});
