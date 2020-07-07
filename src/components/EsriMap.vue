<template>
  <div>
    <div id="myMap" ref="myMap"></div>
    <div class="mapgallery">
      <b-button variant="primary" @click="loadgallery()">Map Gallery</b-button>
    </div>
    <div class="routesdetails">
      <b-button variant="primary" @click="loaddetails()">Routes Details</b-button>
    </div>
    <div class="stopdetails" v-if="showtable == true">
      <b-table
        striped
        hover
        :items="locationlist"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      ></b-table>
    </div>

    <div v-if="popup == true">
      <v-popup
        v-bind:locationOnMap="locationOnMap"
        v-bind:showedit="showedit"
        v-on:show-location="addLocation"
        v-on:edit-location="editLocation"
        v-on:cancel-location="popup = false"
      ></v-popup>
    </div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import BasemapGallery from "esri-loader";
import GraphicsLayer from "esri-loader";
import Location from "../models/Location.js";
import LocationType from "../models/LocationType.js";
import Popup from "./Popup.vue";
//import Grid from "gridjs-vue";

export default {
  components: {
    "v-popup": Popup
  },
  props: { location: Location },
  watch: {
    location: function(newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      this.locationobject = new Location(
        newVal.latitude,
        newVal.longitude,
        newVal.locationType,
        newVal.order,
        newVal.title,
        newVal.content
      );
      this.addLocation(this.locationobject);
    }
  },

  data() {
    return {
      locationobject: Location,
      locationOnMap: Location,
      basemapGallery: BasemapGallery,
      showgallery: false,
      showedit: false,
      graphicsLayer: GraphicsLayer,
      locationlist: [],
      showtable: false,
      sortBy: "order",
      sortDesc: false,
      fields: ["latitude", "longitude", "order", "title", "content"],
      popup: false
    };
  },
  methods: {
    loadgallery: function() {
      this.showgallery = !this.showgallery;
      console.log(this.showgallery);
      if (this.showgallery == true) {
        this.view.ui.add(this.basemapGallery, "bottom-right");
      } else {
        this.view.ui.remove(this.basemapGallery);
      }
    },
    loaddetails: function() {
      this.showtable = !this.showtable;
    },
    editLocation: function(location) {
      console.log("delete location");
      console.log(location);
      this.deleteLocation(location.uid);
      this.addLocation(location);
    },
    deleteLocation: function(locationIddelete) {
      // console.log("location id is" + locationId);
      var itemArray = this.view.popup.selectedFeature.layer.graphics.items;
      var removearray = [];
      for (let i = 0; i < itemArray.length; i++) {
        // console.log(vm.graphicsLayer);
        if (locationIddelete == itemArray[i].attributes.LocationId) {
          removearray.push(itemArray[i]);
        }
      }
      var removePos = -1;
      for (var i = 0; i < this.locationlist.length; i++) {
        if (locationIddelete == this.locationlist[i].uid) {
          removePos = i;
          break;
        }
      }
      this.locationlist.splice(removePos, 1);
      console.log(removePos);
      this.graphicsLayer.removeMany(removearray);
    },
    addLocation: function(location) {
      this.popup = false;
      for (var i = 0; i < this.locationlist.length; i++) {
        if (
          this.locationlist[i].latitude == location.latitude &&
          this.locationlist[i].longitude == location.longitude
        ) {
          window.alert("Point already exists!!");
          return;
        }
        if (this.locationlist[i].order == location.order) {
          window.alert("Order number already exists!!");
          return;
        }
      }
      this.locationlist.push(location);
      console.log(this.locationlist);
      loadModules(["esri/Graphic"], { css: true }).then(([Graphic]) => {
        var point = {
          type: "point",
          longitude: location.longitude,
          latitude: location.latitude
        };
        var markerImage = "./bus_stop.gif";
        if (location.locationType == LocationType.SCHOOL) {
          markerImage = "./school2.jpg";
        }
        var simpleMarkerSymbol = {
          type: "picture-marker",
          url: markerImage,
          width: "20px",
          height: "20px"
        };
        var textSymbol = {
          type: "text", // autocasts as new TextSymbol()
          color: "black",
          haloSize: "1px",
          text: location.order,
          xoffset: 3,
          yoffset: 4,
          font: {
            // autocasts as new Font()
            size: 10,
            family: "Josefin Slab",
            weight: "bold"
          }
        };
        var attributes = {
          Name: location.title,
          Location: location.content,
          LocationId: location.uid,
          Order: location.order,
          Type: location.locationType
        };
        //for editing
        var editThisAction = {
          title: "Edit",
          id: "edit-this",
          className: "esri-icon-edit"
        };
        var deleteThisAction = {
          title: "Delete",
          id: "delete-this",
          className: "esri-icon-trash"
        };
        // Create popup template
        var popupTemplate = {
          title: "{Name}",
          content: "I am located at <b>{Location}</b>.",
          actions: [editThisAction, deleteThisAction]
        };

        var pointGraphic = new Graphic({
          geometry: point,
          attributes: attributes,
          popupTemplate: popupTemplate,
          symbol: simpleMarkerSymbol
        });
        this.graphicsLayer.add(pointGraphic);

        var orderAttributes = {
          Name: location.title,
          Location: location.content,
          LocationId: location.uid,
          Order: location.order,
          Type: location.locationType
        };
        var pointGraphic1 = new Graphic({
          geometry: point,
          attributes: orderAttributes,
          symbol: textSymbol
        });
        this.graphicsLayer.add(pointGraphic1);
        console.log(this.locationlist);
        console.log(location.uid);
      });
    }
  },
  mounted() {
    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/BasemapGallery",
        "esri/layers/GraphicsLayer"
      ],
      { css: true }
    ).then(([ArcGISMap, MapView, BasemapGallery, GraphicsLayer]) => {
      const map = new ArcGISMap({
        basemap: "streets-navigation-vector"
      });

      this.view = new MapView({
        container: this.$refs.myMap,
        map: map,
        center: [-122.099327, 47.662239],
        zoom: 13
      });
      this.graphicsLayer = new GraphicsLayer();
      map.add(this.graphicsLayer);
      var location1 = new Location(
        47.67682,
        -122.12388,

        LocationType.SCHOOL,
        0,
        "St.pauls School",
        "6335 180th st NE "
      );
      var location2 = new Location(
        47.67438,
        -122.09948,

        LocationType.BUSSTOP,
        1,
        "1st Point",
        "7882,170th st NE"
      );
      this.addLocation(location1);
      this.addLocation(location2);
      var vm = this;

      this.view.on("click", function(event) {
        // Get the coordinates of the click on the view
        // vm.view.popup.autoOpenEnabled = false;

        vm.view.hitTest(event).then(result => {
          if (result.results.length < 2) {
            var lat = event.mapPoint.latitude;
            var lon = event.mapPoint.longitude;
            console.log(lat);
            console.log(lon);
            // Define a new component called button-counter

            vm.locationOnMap = new Location(lat, lon, "x", "", "", "");
            vm.popup = !vm.popup;
            vm.showedit = false;
            console.log(vm.popup);
          }
        });
      });

      // Event handler that fires each time an action is clicked
      vm.view.popup.on("trigger-action", function(event) {
        if (event.action.id === "edit-this") {
          // console.log(vm.view.popup.selectedFeature);

          var locationId = vm.view.popup.selectedFeature.attributes.LocationId;
          // console.log("location id is" + locationId);
          var itemArray1 = vm.view.popup.selectedFeature.layer.graphics.items;
          console.log(vm.view.popup.selectedFeature);
          for (let i = 0; i < itemArray1.length; i++) {
            // console.log(vm.graphicsLayer);
            if (locationId == itemArray1[i].attributes.LocationId) {
              console.log("nameee" + itemArray1[i].attributes.Name);
              vm.locationOnMap = new Location(
                vm.view.popup.selectedFeature.geometry.latitude,
                vm.view.popup.selectedFeature.geometry.longitude,
                itemArray1[i].attributes.Type,
                itemArray1[i].attributes.Order,
                itemArray1[i].attributes.Name,
                itemArray1[i].attributes.Location,
                itemArray1[i].attributes.LocationId
              );
              break;
            }
          }
          vm.popup = !vm.popup;
          vm.showedit = true;
          vm.view.popup.visible = false;
        }

        if (event.action.id === "delete-this") {
          //console.log(vm.view.popup.selectedFeature);
          var locationIddelete =
            vm.view.popup.selectedFeature.attributes.LocationId;
          vm.deleteLocation(locationIddelete);
          vm.view.popup.visible = false;
        }
      });

      this.basemapGallery = new BasemapGallery({
        view: this.view,
        source: {
          portal: {
            url: "http://www.arcgis.com",
            useVectorBasemaps: true
          }
        }
      });
    });
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
};
</script>

<style scoped>
html,
body {
  margin: 0;
}
.mapgallery {
  display: inline-block;
  margin: 0 auto;
}
.routesdetails {
  display: inline-block;
  margin-left: 25px;
}
.stopdetails {
  margin-left: 1100px;
  height: 500px;
  width: 100px;
}
.btn-primary {
  background-color: #17a2b8 !important;
  border: none;
}
#myMap {
  height: 600px;
  margin: 100px 50px 75px 250px;
}
</style>
