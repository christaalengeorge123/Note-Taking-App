class Dataservice {
  hmap = new Map();

  addintomap(note) {
    this.hmap[note.id] = note;
  }
  getnotelist() {
    return this.hmap.values();
  }
  deletefromhmap(id) {
    if (this.hmap.has(id)) {
      this.hmap.delete(id);
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
