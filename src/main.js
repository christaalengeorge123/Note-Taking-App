import Vue from "vue";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Dataservice from "./services/Dataservice.js";
import Mapservice from "./services/Mapservice.js";

import App from "./App.vue";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.prototype.$dataService = new Dataservice();
Vue.prototype.$mapService = new Mapservice();

new Vue({
  render: (h) => h(App),
}).$mount("#app");
