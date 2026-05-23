import { expect } from '@playwright/test';

class BookingEvent {
  constructor(page) {
    this.page = page;
    this.allEventCards = page.locator('[data-testid="event-card"]');
    this.customerName = page.locator('#customerName');
    this.customerEmail = page.locator('#customer-email');
    this.customerPhone = page.locator('#phone');
    this.confirmationButton = page.getByRole('button', {
      name: 'Confirm Booking',
    });
    this.myBookingButton = page.getByRole('button', {
      name: 'View My bookings',
    });

    this.bookingCard = page.locator('[data-testid="booking-card"]');
    this.confirmationWindow = page.locator(
      '[data-testid="confirm-dialog-yes"]',
    );
  }

  async findFirstEventCreated(eventName) {
    await expect(this.allEventCards.nth(0)).toBeVisible();
    const firstEventCard = this.allEventCards.filter({ hasText: eventName });
    await firstEventCard.locator('#book-now-btn').click();
  }

  async fillBookingForm(name, email, phone) {
    await this.customerName.fill(name);
    await this.customerEmail.fill(email);
    await this.customerPhone.fill(phone);
    await this.confirmationButton.click();
  }

  async referenceID() {
    const bookingID = await this.page.locator('.booking-ref').textContent();
    await this.myBookingButton.click();
    const firstBookingRef = await this.page.locator('.booking-ref').first();
    await expect(firstBookingRef).toHaveText(bookingID);
  }

  async cancelEvent() {
    const firstBookingCard = this.bookingCard.first();
    await firstBookingCard
      .locator('[data-testid="cancel-booking-btn"]')
      .click();
    await this.confirmationWindow.click();
    // prettier-ignore
    await expect(this.page.getByText('Booking cancelled successfully')).toBeVisible();
  }
}

export { BookingEvent };
