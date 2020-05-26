export default class Dataservice {
  hmap = new Map();

  addItem(note) {
    if (this.hmap.has(note.id)) {
      console.log("alredy existing");
    }
    this.hmap.set(note.id, note);
    console.log("her e- " + this.hmap);
  }
  getnotelist() {
    let notelist = [];
    for (let value of this.hmap.values()) {
      notelist.push(value);
    }

    return notelist;
  }
  deleteItem(id) {
    if (this.hmap.has(id)) {
      this.hmap.delete(id);
    }
  }
  displayNoteContent(id) {
    if (this.hmap.has(id)) {
      return this.hmap.get(id);
    }
  }
  createUid() {
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
