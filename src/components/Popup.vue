<template>
  <div class="modal">
    <div class="radio-type">
      <input type="radio" v-model="locationtype" value="busstop" />Bus Stop
      <input type="radio" v-model="locationtype" value="school" />School
    </div>
    <div class="order">
      <input type="text" id="order"  v-model="location.order" required placeholder="order" />
    </div>
    <div class="title">
      <input type="text" id="title" v-model="location.title" required placeholder="Title" />
    </div>
    <div class="content">
      <input type="text" id="content" v-model="location.content" required placeholder="Content" />
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
  props: { locationOnMap: Location, editLocation:Location, showedit:Boolean},
  data() {
    return {
      location: Location,
      locationtype: LocationType
    };
  },
  methods: {
    insertcoordinates: function() {
      this.location = new Location(
        this.locationOnMap.latitude,
        this.locationOnMap.longitude,
        this.locationtype,
        this.location.order,
        this.location.title,
        this.location.content
      );
      console.log("New location is" + this.location.latitude);
      this.$emit("show-location", this.location);
    },
    cancelroutes: function() {
      this.$emit("cancel-location");
    }
  },
  mounted() {
    console.log("editlocation ha hu =" + this.editLocation);
    console.log(this.editLocation.order);
    this.location = this.editLocation;
    console.log(this.location);
  }
};
console.log("qqqqqqqqq11");
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
.cancelroutes{
  display: inline-block;
}
</style>