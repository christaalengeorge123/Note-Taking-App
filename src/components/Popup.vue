<template>
  <div class="modal">
    <div class="radio-type">
      <input type="radio" v-model="locationOnMap.locationType" value="busstop" />Bus Stop
      <input type="radio" v-model="locationOnMap.locationType" value="school" />School
    </div>
    <div class="order">
      <input type="text" id="order" v-model="locationOnMap.order" required placeholder="order" />
    </div>
    <div class="title">
      <input type="text" id="title" v-model="locationOnMap.title" required placeholder="Title" />
    </div>
    <div class="content">
      <input
        type="text"
        id="content"
        v-model="locationOnMap.content"
        required
        placeholder="Content"
      />
    </div>
    <div class="insertroutes">
      <b-button variant="primary" v-if="showedit == false" @click="insertcoordinates()">Add</b-button>
    </div>
    <div class="insertroutes">
      <b-button variant="primary" v-if="showedit == true" @click="editcoordinates()">Edit</b-button>
    </div>
    <div class="cancelroutes">
      <b-button variant="primary" @click="cancelroutes()">Cancel</b-button>
    </div>
  </div>
</template>
    
    <script>
import Location from "../models/Location.js";
import LocationType from "../models/LocationType";
export default {
  name: "Popup",
  props: { locationOnMap: Location, showedit: Boolean },
  data() {
    return {
      locationtype: LocationType
    };
  },
  methods: {
    insertcoordinates: function() {
      console.log("New location is" + this.locationOnMap.latitude);
      this.$emit("show-location", this.locationOnMap);
    },
    cancelroutes: function() {
      this.$emit("cancel-location");
    },
    editcoordinates: function() {
      this.$emit("edit-location", this.locationOnMap);
    }
  }
};
</script>
    
    
    <style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -100px;
  display: block;
  height: 200px;
  width: 200px;
  background-color: rgb(255, 255, 255);
}
.order {
  margin-top: 8px;
  margin-left: 5px;
  margin-right: 5px;
}
.title {
  margin-top: 8px;
  margin-left: 5px;
  margin-right: 10px;
}
.content {
  margin-top: 8px;
  margin-left: 5px;
  margin-right: 5px;
}
.btn-primary {
  background-color: #17a2b8 !important;
  border: none;
}
.insertroutes {
  margin-top: 8px;
  margin-left: 5px;
  margin-right: 5px;
  display: inline-block;
}
.cancelroutes {
  display: inline-block;
}
</style>