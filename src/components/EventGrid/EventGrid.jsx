import EventCard from "@/app/page";

class EventGrid {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  renderItems(events) {
    this._container.innerHTML = "";
    events.forEach((event) => {
      this.addItem(event);
    });
  }

  addItem(event) {
    const eventCard = new EventCard(event);
    const element = eventCard.render();
    this._container.append(element);
  }
}
