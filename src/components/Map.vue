<template>
  <div>
    <body>
      <div id="myMap"></div>
    </body>
    <!--<div class="showroutes">
      <b-button variant="primary" @click="loadroutes()">View Routes</b-button>
    </div>-->
  </div>
</template>

<script>
import * as atlas from "azure-maps-control";

import {
  SubscriptionKeyCredential,
  MapsURL,
  RouteURL,
  Aborter,
} from "azure-maps-rest";

export default {
  df() {},
  data() {
    return {
      map: atlas.Map,
      datasource: atlas.source.Datasource,
      subscriptionKeyCredential6: SubscriptionKeyCredential,
    };
  },
  methods: {
    // loadroutes: function() {},
  },
  mounted() {
    let externalScript = document.createElement("script");
    externalScript.setAttribute(
      "src",
      "node_modules/azure-maps-control/dist/atlas.min.js"
    );
    document.head.appendChild(externalScript);

    let externalScript2 = document.createElement("script");
    externalScript2.setAttribute(
      "src",
      "node_modules/azure-maps-rest/dist/atlas-service.min.js"
    );
    document.head.appendChild(externalScript2);

    let externallink = document.createElement("link");
    externallink.setAttribute("rel", "stylesheet");
    externallink.setAttribute(
      "href",
      "node_modules/azure-maps-control/dist/atlas.min.css"
    );
    externallink.setAttribute("type", "text/css");
    document.head.appendChild(externallink);

    this.map = new atlas.Map("myMap", {
      center: [-122.33, 47.6],
      zoom: 12,
      language: "en-US",
      authOptions: {
        authType: "subscriptionKey",
        subscriptionKey: "",
      },
    });

    //Wait until the map resources are ready.
    var vm = this;
    this.map.events.add("ready", function() {
      //Create a data source and add it to the map.
      vm.datasource = new atlas.source.DataSource();
      vm.map.sources.add(vm.datasource);

      //Add a layer for rendering the route lines and have it render under the map labels.
      vm.map.layers.add(
        new atlas.layer.LineLayer(vm.datasource, null, {
          strokeColor: "#2272B9",
          strokeWidth: 5,
          lineJoin: "round",
          lineCap: "round",
        }),
        "labels"
      );

      //Add a layer for rendering point data.
      vm.map.layers.add(
        new atlas.layer.SymbolLayer(vm.datasource, null, {
          iconOptions: {
            image: ["get", "icon"],
            allowOverlap: true,
          },
          textOptions: {
            textField: ["get", "title"],
            offset: [0, 1.2],
          },
          filter: [
            "any",
            ["==", ["geometry-type"], "Point"],
            ["==", ["geometry-type"], "MultiPoint"],
          ], //Only render Point or MultiPoints in this layer.
        })
      );

      //Create the GeoJSON objects which represent the start and end points of the route.
      var startPoint = new atlas.data.Feature(
        new atlas.data.Point([-122.130137, 47.644702]),
        {
          title: "Redmond",
          icon: "pin-blue",
        }
      );

      var midPoint = new atlas.data.Feature(
        new atlas.data.Point([-122.20029, 47.61243]),
        {
          title: "Bellevue",
          icon: "pin-round-blue",
        }
      );

      var endPoint = new atlas.data.Feature(
        new atlas.data.Point([-122.3352, 47.61397]),
        {
          title: "Seattle",
          icon: "pin-round-blue",
        }
      );

      //Add the data to the data source.
      vm.datasource.add([startPoint, midPoint, endPoint]);

      vm.map.setCamera({
        bounds: atlas.data.BoundingBox.fromData([
          startPoint,
          midPoint,
          endPoint,
        ]),
        padding: 80,
      });

      // Use SubscriptionKeyCredential with a subscription key

      vm.subscriptionKeyCredential6 = new SubscriptionKeyCredential(
        atlas.getSubscriptionKey()
      );

      // Use subscriptionKeyCredential to create a pipeline
      var pipeline = MapsURL.newPipeline(vm.subscriptionKeyCredential6);

      // Construct the RouteURL object
      var routeURL = new RouteURL(pipeline);

      //Start and end point input to the routeURL
      var coordinates = [
        [
          startPoint.geometry.coordinates[0],
          startPoint.geometry.coordinates[1],
        ],
        [midPoint.geometry.coordinates[0], midPoint.geometry.coordinates[1]],
        [endPoint.geometry.coordinates[0], endPoint.geometry.coordinates[1]],
      ];

      //Make a search route request
      routeURL
        .calculateRouteDirections(Aborter.timeout(10000), coordinates)
        .then((directions) => {
          //Get data features from response
          var data = directions.geojson.getFeatures();
          vm.datasource.add(data);
        });
    });
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
}

#myMap {
  height: 700px;
  margin: 100px 50px 75px 250px;
}
.btn-primary {
  background-color: #17a2b8 !important;
  border: none;
}
.showroutes {
  display: inline-block;
  margin: 0 auto;
}
</style>
