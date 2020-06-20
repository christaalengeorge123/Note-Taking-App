export default class Location {
  constructor(latitude, longitude, locationType, order, title, content) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.locationType = locationType;
    this.order = order;
    this.title = title;
    this.content = content;
  }
}
