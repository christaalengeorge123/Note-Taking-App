<template>
  <div>
    <div>
      <v-header></v-header>
    </div>
   
    <div class="page-info">
      <div class="display-titles">
        <li v-for="item in items" :key="item.title">
          <b-button variant="titles" @click="displayContent(item.id)">
            {{
            item.title
            }}
          </b-button>
        </li>
      </div>
      <!--  <div class="newpagebutton">
        <b-button variant="primary" @click="createNotes()">New page</b-button>
      </div>-->
      <div class="mapbutton">
        <b-button variant="primary" @click="redirectToMaps()">View map</b-button>
      </div>
      <div class="addroutes">
        <b-button variant="primary" @click="addcoordinates()">Add Routes</b-button>
      </div>
      <div class="addcoordinates" v-if="isNewcoordinate == true">
        <div class="latitude">
          <b-form-input id="input-2" v-model="location.latitude" required placeholder="Latitude"></b-form-input>
        </div>
        <div class="longitude">
          <b-form-input id="input-2" v-model="location.longitude" required placeholder="Longitude"></b-form-input>
        </div>
        <div class="radio-type">
          <input type="radio" v-model="locationtype" value="busstop" />Bus Stop
          <input type="radio" v-model="locationtype" value="school" />School
        </div>
        <div class="orderNo">
          <b-form-input id="input-2" v-model="location.order" required placeholder="Order Number"></b-form-input>
        </div>
        <div class="title">
          <b-form-input id="input-2" v-model="location.title" required placeholder="Title"></b-form-input>
        </div>
        <div class="content">
          <b-form-input id="input-2" v-model="location.content" required placeholder="Content"></b-form-input>
        </div>
        <div class="insertroutes">
          <b-button variant="primary" @click="insertcoordinates()">Add</b-button>
        </div>
      </div>
    </div>

    <div v-if="showpage == true">
      <v-newpage
        v-on:show-page="reloadItems(), (showpage = false)"
        v-bind:note="note"
        v-bind:isNewNote="isNewNote"
      ></v-newpage>
    </div>
    <div v-if="showmap == true">
      <v-map v-bind:location="location"></v-map>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Newpage from "./Newpage.vue";
import Note from "../models/Note.js";
import EsriMap from "./EsriMap.vue";
import Location from "../models/Location.js";
import LocationType from "../models/LocationType";
//import Popup from "./Popup.vue";
export default {
  data() {
    return {
      showpage: Boolean,
      items: [],
      note: Note,
      location: Location,
      isNewNote: Boolean,
      showmap: Boolean,
      isNewcoordinate: false,
      locationtype: LocationType
      //mapdata: {},
    };
  },
  components: {
    "v-header": Header,
    "v-newpage": Newpage,
    "v-map": EsriMap,
    //"v-popup": Popup
  },
  methods: {
    // TODO: Create methods that will be sent into Button component
    createNotes: function() {
      this.isNewNote = true;
      this.showpage = true;
      this.showmap = false;
      console.log(this.isNewNote);
      this.note = new Note("", "", "");
    },
    redirectToMaps: function() {
      this.showmap = true;
      this.showpage = false;
    },

    reloadItems: function() {
      this.$dataService.getnotelist().then(result => {
        // successMessage is whatever we passed in the resolve(...) function above.
        // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
        this.items = result;
      });
    },
    addcoordinates: function() {
      this.isNewcoordinate = !this.isNewcoordinate;
    },
    insertcoordinates: function() {
      //console.log("latitude" + this.location.latitude);
      //console.log("longitude" + this.location.longitude);
      this.isNewcoordinate = !this.isNewcoordinate;
      this.location = new Location(
        this.location.latitude,
        this.location.longitude,
        this.locationtype,
        this.location.order,
        this.location.title,
        this.location.content
      );
      console.log(this.location);
    },
    displayContent: function(id) {
      this.$dataService.displayNoteContent(id).then(result => {
        var note = new Note(result.id, result.title, result.content);
        this.note = note;
        this.showpage = true;
        this.isNewNote = false;
        console.log(this.isNewNote);
      });
    }
  },

  beforeMount() {
    this.reloadItems();
  }
};
</script>
<style scoped>
.page-info {
  width: 230px;
  background: #f0ffff;
  position: absolute;
  left: 0;
  height: 100%;
}

.btn-primary {
  background-color: #17a2b8 !important;
  border: none;
}
.newpagebutton {
  margin-top: 100px;
}
.mapbutton {
  margin-top: 25px;
}
.addroutes {
  margin-top: 30px;
}
.addcoordinates {
  margin-top: 32px;
  height: 200px;
}
.radio-type {
  margin-top: 35px;
}
.orderNo {
  margin-top: 36px;
}
.title {
  margin-top: 37px;
}
.content {
  margin-top: 38px;
}
.insertroutes {
  margin-top: 36px;
}
.longitude {
  margin-top: 34px;
}
.display-titles {
  padding-top: 50px;
}
.btn-titles {
  background-color: lightskyblue !important;
  border: none;
}
li:not(:last-child) {
  margin-bottom: 5px;
}
</style>
