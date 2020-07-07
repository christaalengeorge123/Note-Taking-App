export default class Location {
  constructor(
    latitude,
    longitude,
    locationType,
    order,
    title,
    content,
    uid = this.uniqueId()
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.locationType = locationType;
    this.order = order;
    this.title = title;
    this.content = content;
    this.uid = uid;
  }

  uniqueId() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }
}
