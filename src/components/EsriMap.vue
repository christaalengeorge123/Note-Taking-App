<template>
  <div>
    <div id="myMap" ref="myMap"></div>
    <div class="mapgallery">
      <b-button variant="primary" @click="loadgallery()">Map Gallery</b-button>
    </div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import BasemapGallery from "esri-loader";
import GraphicsLayer from "esri-loader";
import Location from "../models/Location.js";

export default {
  props: { location: Location },
  watch: {
    location: function(newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
    },
  },
  data() {
    return {
      basemapGallery: BasemapGallery,
      showgallery: false,
      graphicsLayer: GraphicsLayer,
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
  },
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS

    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/BasemapGallery",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
      ],
      { css: true }
    ).then(([ArcGISMap, MapView, BasemapGallery, Graphic, GraphicsLayer]) => {
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
      // Create a point
      var point = {
        type: "point",
        longitude: -122.12388,
        latitude: 47.67682,
      };
      console.log("latitude" + this.location.latitude);
      console.log("longitude" + this.location.longitude);
      var point2 = {
        type: "point",
        longitude: -122.09116,
        latitude: 47.67438,
      };

      var simpleMarkerSymbol = {
        type: "picture-marker", // autocasts as new PictureMarkerSymbol()
        url: "./bus_stop.gif",
        width: "25px",
        height: "25px",
      };
      //*** ADD ***//
      // Create attributes
      var attributes = {
        Name: "My point", // The name of the
        Location: " Point Dume State Beach", // The owner of the
      };
      // Create popup template
      var popupTemplate = {
        title: "{Name}",
        content: "I am located at <b>{Location}</b>.",
      };

      var pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol,
        attributes: attributes,
        popupTemplate: popupTemplate,
      });
      var pointGraphic2 = new Graphic({
        geometry: point2,

        symbol: simpleMarkerSymbol,
      });

      this.graphicsLayer.add(pointGraphic);
      this.graphicsLayer.add(pointGraphic2);

      this.basemapGallery = new BasemapGallery({
        view: this.view,
        source: {
          portal: {
            url: "http://www.arcgis.com",
            useVectorBasemaps: true, // Load vector tile basemap group
          },
        },
      });
      //  this.view.ui.add(this.basemapGallery, "top-right");
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
.btn-primary {
  background-color: #17a2b8 !important;
  border: none;
}
#myMap {
  height: 600px;
  width: 1500px;

  margin: 100px 50px 75px 250px;
}
</style>
