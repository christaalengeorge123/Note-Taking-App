<template>
  <div>
    <div id="myMap" ref="myMap"></div>
    <div class="mapgallery">
      <b-button variant="primary" @click="loadgallery()">Map Gallery</b-button>
    </div>
    <div class="routesdetails">
      <b-button variant="primary" @click="loaddetails()"
        >Routes Details</b-button
      >
    </div>
    <div class="stopdetails" v-if="showtable == true">
      <b-table striped hover :items="locationlist" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import BasemapGallery from "esri-loader";
import GraphicsLayer from "esri-loader";
import Location from "../models/Location.js";
import LocationType from "../models/LocationType.js";
//import Grid from "gridjs-vue";

export default {
  props: { location: Location },
  watch: {
    location: function(newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      this.addLocation(newVal);
    },
  },

  data() {
    return {
      basemapGallery: BasemapGallery,
      showgallery: false,
      graphicsLayer: GraphicsLayer,
      locationlist: [],
      showtable: false,
      fields: ["latitude", "longitude", "order", "title", "content"],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald",
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      ],
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
    addLocation: function(location) {
      this.locationlist.push(location);
      loadModules(["esri/Graphic"], { css: true }).then(([Graphic]) => {
        var point = {
          type: "point",
          longitude: location.longitude,
          latitude: location.latitude,
        };
        var markerImage = "./bus_stop.gif";
        if (location.locationType == LocationType.SCHOOL) {
          markerImage = "./school2.jpg";
        }
        var simpleMarkerSymbol = {
          type: "picture-marker",
          url: markerImage,
          width: "25px",
          height: "25px",
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
            size: 12,
            family: "Josefin Slab",
            weight: "bold",
          },
        };
        var attributes = {
          Name: location.title,
          Location: location.content,
        };
        // Create popup template
        var popupTemplate = {
          title: "{Name}",
          content: "I am located at <b>{Location}</b>.",
        };
        var pointGraphic = new Graphic({
          geometry: point,
          attributes: attributes,
          popupTemplate: popupTemplate,
          symbol: simpleMarkerSymbol,
        });
        this.graphicsLayer.add(pointGraphic);

        var pointGraphic1 = new Graphic({
          geometry: point,
          symbol: textSymbol,
        });
        this.graphicsLayer.add(pointGraphic1);
        console.log(this.locationlist);
      });
    },
  },
  mounted() {
    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/BasemapGallery",
        "esri/layers/GraphicsLayer",
      ],
      { css: true }
    ).then(([ArcGISMap, MapView, BasemapGallery, GraphicsLayer]) => {
      const map = new ArcGISMap({
        basemap: "streets-navigation-vector",
      });

      this.view = new MapView({
        container: this.$refs.myMap,
        map: map,
        center: [-122.099327, 47.662239],
        zoom: 13,
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

      this.basemapGallery = new BasemapGallery({
        view: this.view,
        source: {
          portal: {
            url: "http://www.arcgis.com",
            useVectorBasemaps: true,
          },
        },
      });
    });
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  },
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
