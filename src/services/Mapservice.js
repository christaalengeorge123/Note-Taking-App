import axios from "axios";
export default class Mapservice {
  https = axios;
  baseURI = " https://atlas.microsoft.com/";

  getmaproutes() {
    let mypromise = new Promise((resolve, reject) => {
      try {
        const uri =
          this.baseURI +
          "route/directions/json?subscription-key=ZHCIZ9CrnF-MIF7DuqWOnX8BTHmjjty9dE1C8AAFJHk&api-version=1.0&query=52.50931,13.42936:52.50274,13.43872";
        this.https.get(uri).then((result) => {
          console.log(result.data);

          resolve(result.data);
        });
      } catch (err) {
        reject("Error in calling API" + err);
      }
    });
    return mypromise;
  }
}
