<template>
  <div>
    <div>
      <v-header></v-header>
    </div>
    <div class="page-info"></div>
    <div class="title">
      <!-- <b-form-group id="input-group-2" label="Title:" label-for="input-2">-->
      <b-form-input id="input-2" v-model="title" required placeholder="Enter Title"></b-form-input>
      <!-- </b-form-group>-->
    </div>
    <div class="content">
      <b-form-textarea
        id="textarea"
        v-model="text"
        :placeholder="'Enter content of ' + [[ title ]]"
        rows="10"
      ></b-form-textarea>
    </div>
    <div class="addbutton">
      <b-button variant="primary" style="margin-right: 30px">Delete Page</b-button>

      <b-button variant="primary">Save page</b-button>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
export default {
  components: {
    "v-header": Header
    // TODO: Register Button component locally
  },
  methods: {
    // TODO: Create methods that will be sent into Button component
  },
  data() {
    return {
      text: "",
      title: ""
    };
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
.content {
  margin: 100px 50px 75px 200px;
}
.title {
  margin: 100px 50px 75px 200px;
}
#input-group-2.label {
  margin-left: 175px;
  font-size: 100px;
}
.addbutton {
  margin-left: 175px;
}
.btn-primary {
  background-color: #17a2b8 !important;
  border: none;
}
</style>
