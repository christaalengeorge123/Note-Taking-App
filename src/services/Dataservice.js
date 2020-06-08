import axios from "axios";
import Note from "../models/Note.js";

export default class Dataservice {
  hmap = new Map();
  http = axios;
  baseURI = "http://localhost:5000/";

  addItem(note) {
    let mypromise = new Promise((resolve, reject) => {
      try {
        const uri = this.baseURI + "api/notes";
        this.http
          .post(uri, { Title: note.title, Content: note.content })
          .then((result) => {
            resolve(result);
          });
      } catch (err) {
        reject("Error in calling API" + err);
      }
    });
    return mypromise;
  }
  updateItem(note) {
    let mypromise = new Promise((resolve, reject) => {
      try {
        console.log(note.id);
        const uri = this.baseURI + "api/notes/" + note.id;
        this.http
          .put(uri, { Id: note.id, Title: note.title, Content: note.content })
          .then((result) => {
            resolve(result);
          });
      } catch (err) {
        reject("Error in calling API" + err);
      }
    });
    return mypromise;
  }

  getnotelist() {
    let mypromise = new Promise((resolve, reject) => {
      try {
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
}
