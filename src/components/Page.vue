<template>
  <div>
    <div>
      <v-header></v-header>
    </div>
    <div class="page-info">
      <div class="display-titles">
        <li v-for="item in items" :key="item.title">
          <b-button variant="titles" @click="displayContent(item.id)">{{
            item.title
          }}</b-button>
        </li>
      </div>
      <div class="newpagebutton">
        <b-button variant="primary" @click="createNotes()">New page</b-button>
      </div>
    </div>

    <div v-if="showpage == true">
      <v-newpage
        v-on:show-page="reloadItems(), (showpage = false)"
        v-bind:note="note"
        v-bind:isNewNote="isNewNote"
      ></v-newpage>
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
      showpage: Boolean,
      items: [],
      note: Note,
      isNewNote: Boolean,
    };
  },
  components: {
    "v-header": Header,
    "v-newpage": Newpage,

    // TODO: Register Button component locally
  },
  methods: {
    // TODO: Create methods that will be sent into Button component
    createNotes: function() {
      this.isNewNote = true;
      this.showpage = true;
      console.log(this.isNewNote);
      this.note = new Note("", "", "");
    },
    reloadItems: function() {
      this.$dataService.getnotelist().then((result) => {
        // successMessage is whatever we passed in the resolve(...) function above.
        // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
        this.items = result;
      });
    },
    displayContent: function(id) {
      this.$dataService.displayNoteContent(id).then((result) => {
        var note = new Note(result.id, result.title, result.content);
        this.note = note;
        this.showpage = true;
        this.isNewNote = false;
        console.log(this.isNewNote);
      });
    },
  },

  beforeMount() {
    this.reloadItems();
  },
};
</script>
<style scoped>
.page-info {
  width: 230px;
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
  margin-top: 100px;
}
.display-titles {
  padding-top: 50px;
}
.btn-titles {
  background-color: lightskyblue !important;
  border: none;
}
li:not(:last-child) {
  margin-bottom: 5px;
}
</style>
