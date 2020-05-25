<template>
  <div class="newpage">
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

      <b-button variant="primary" v-on:click="$emit('show-page')">Save page</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      title: ""
    };
  }
};
</script>

<style scoped>
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