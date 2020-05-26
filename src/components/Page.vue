<template>
  <div>
    <div>
      <v-header></v-header>
    </div>
    <div class="page-info">
      <div class="display-titles">
        <li v-for="item in items" :key="item.title">
          <b-button variant="titles">{{ item.title }}</b-button>
        </li>
      </div>
      <div class="newpagebutton">
        <b-button variant="primary" @click="swapComponent()">New page</b-button>
      </div>
    </div>

    <div v-if="showpage==true">
      <v-newpage v-on:show-page="reloadItems(), showpage = false"></v-newpage>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Newpage from "./Newpage.vue";
// import Note from "../models/Note.js";
export default {
  data() {
    return {
      showpage: Boolean,
      items: []
    };
  },
  components: {
    "v-header": Header,
    "v-newpage": Newpage

    // TODO: Register Button component locally
  },
  methods: {
    // TODO: Create methods that will be sent into Button component
    swapComponent: function() {
      this.showpage = true;
    },
    reloadItems: function() {
      this.items = this.$dataService.getnotelist();
      console.log(this.items);
    }
  },
  beforeMount() {
    this.reloadItems();
  }
};
</script>
<style scoped>
.page-info {
  width: 175px;
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
  margin-top: 800px;
}
.display-titles {
  padding-top: 50px;
}
.btn-titles {
  background-color: lightskyblue !important;
  border: none;
}
</style>
