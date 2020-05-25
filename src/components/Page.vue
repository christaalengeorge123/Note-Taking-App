<template>
  <div>
    <div>
      <v-header></v-header>
    </div>
    <div class="page-info">
      <div class="newpagebutton">
        <b-button variant="primary" @click="swapComponent()">New page</b-button>
      </div>
    </div>

    <div v-if="showpage==true">
      <v-newpage v-on:show-page="showpage = false"></v-newpage>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Newpage from "./Newpage.vue";
import Note from "../models/Note.js";
export default {
  data() {
    return {
      showpage: Boolean
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
      const note = new Note(1, "first", "errere");
      console.log(note.title);
      console.log(this.showpage);
    }
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
</style>
