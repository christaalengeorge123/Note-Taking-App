<template>
  <div class="newpage">
    <div class="title">
      <!-- <b-form-group id="input-group-2" label="Title:" label-for="input-2">-->
      <b-form-input
        id="input-2"
        v-model="note.title"
        required
        placeholder="Enter Title"
      ></b-form-input>
      <!-- </b-form-group>-->
    </div>
    <div class="content">
      <b-form-textarea
        id="textarea"
        v-model="note.content"
        :placeholder="'Enter content of ' + [[note.title]]"
        rows="10"
      ></b-form-textarea>
    </div>
    <div class="addbutton">
      <b-button
        variant="primary"
        style="margin-right: 30px"
        v-on:click="deleteitem(note.id)"
        >Delete Page</b-button
      >

      <b-button variant="primary" v-on:click="saveitem()">Save page</b-button>
    </div>
  </div>
</template>

<script>
//import Note from "../models/Note.js";
export default {
  props: ["note"],
  data() {
    return {};
  },
  methods: {
    saveitem: function() {
      this.$dataService.addItem(this.note);
      console.log(this.$dataService.getnotelist());
      this.$emit("show-page");
    },
    deleteitem: function(id) {
      this.$dataService.deleteItem(id).then((result) => {
        console.log(result);
        this.$emit("show-page");
      });
    },
  },
};
</script>

<style scoped>
.content {
  margin: 100px 50px 75px 250px;
}
.title {
  margin: 100px 50px 75px 250px;
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
