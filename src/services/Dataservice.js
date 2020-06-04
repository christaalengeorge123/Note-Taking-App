import axios from "axios";
import Note from "../models/Note.js";

export default class Dataservice {
  hmap = new Map();
  http = axios;
  baseURI = "http://localhost:5000/";

  addItem(note) {
    if (this.hmap.has(note.id)) {
      console.log("alredy existing");
    }
    this.hmap.set(note.id, note);
    console.log("her e- " + this.hmap);
  }

  getnotelist() {
    let mypromise = new Promise((resolve, reject) => {
      try {
        console.log("blaaaaaaa");
        const uri = this.baseURI + "api/notes";
        this.http.get(uri).then((result) => {
          console.log(result.data);

          resolve(result.data);
        });
      } catch (err) {
        reject("Error in calling API" + err);
      }
    });
    return mypromise;
  }

  deleteItem(id) {
    // const uri = this.baseURI + "api/notes/" + id;
    let mypromise = new Promise((resolve, reject) => {
      try {
        const uri = this.baseURI + "api/notes/" + id;
        this.http.delete(uri).then((result) => {
          resolve(result);
        });
      } catch (err) {
        reject("Error in calling API" + err);
      }
    });
    return mypromise;
  }
  displayNoteContent(id) {
    let mypromise1 = new Promise((resolve, reject) => {
      try {
        console.log("blaaaaaaa1");
        const uri = this.baseURI + "api/notes/" + id;
        this.http.get(uri).then((result) => {
          console.log(result.data);
          var note = new Note(
            result.data.id,
            result.data.title,
            result.data.content
          );
          resolve(note);
        });
      } catch (err) {
        reject("Error in calling API" + err);
      }
    });
    return mypromise1;
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
