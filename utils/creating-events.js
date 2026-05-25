class CreateEvent {
  constructor(page) {
    this.page = page;
    this.addNewEventBtn = page.getByRole('button', { name: 'Add New Event' });
    this.title = page.locator('#event-title-input');
    this.city = page.locator('#city');
    this.venue = page.locator('#venue');
    this.date = page.getByLabel('Event Date & Time');
    this.price = page.getByLabel('Price ($)');
    this.seats = page.locator('#total-seats');
    this.btn = page.getByTestId('add-event-btn');
  }

  // prettier-ignore
  async newEvent(eventName, cityName, venueAndAddress, dateAndTime, price, totalSeats) {
    await this.addNewEventBtn.click();
    await this.title.fill(eventName);
    await this.city.fill(cityName);
    await this.venue.fill(venueAndAddress);
    await this.date.fill(dateAndTime);
    await this.price.fill(price);
    await this.seats.fill(totalSeats)
    await this.btn.click()
  }
}

export { CreateEvent };
