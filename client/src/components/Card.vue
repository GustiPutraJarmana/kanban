<!-- @format -->

<template>
  <div id="Card" class="card-content mt-4" style="color:#E75B95;">
    <div class="title bg-yellow text-center mt-2" style="font-family: 'Permanent Marker';color:green; border-bottom: 4px solid black; border-radius:15px; margin : 2px; font-size:1.5em;">
      {{ detailTask.title }}
    </div>
    <div class="description bg-light mt-2 mx-2" style="font-family: 'Courgette', cursive;">
      => {{ detailTask.description }}
    </div>
    <div class="container">
    <div class="row text-center mt-3 mb-3 mx-1" style="border-radius:15px; -webkit-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75); background-color:yellow; opacity: 0.8">
      <div class="col-3 text-center" style="font-size:20px;">
        <a
          href=""
          @click.prevent="geserKiri" 
          v-if="detailTask.category !== 'todo'"
          ><i class="fas fa-hand-point-left"></i
        ></a>
      </div>
      <div class="col-3 text-center" style="font-size:20px;">
        <a href="" @click.prevent="editForm"><i class="fas fa-highlighter"></i></a>
      </div>
      <div class="col-3 text-center" style="font-size:20px;">
        <a href="" @click.prevent="deleteData" 
          ><i class="far fa-trash-alt"></i
        ></a>
      </div>
      <div class="col-3 text-center" style="font-size:20px;">
        <a
          href=""
          @click.prevent="geserKanan"
          v-if="detailTask.category !== 'completed'"
          ><i class="fas fa-hand-point-right"></i
        ></a>
      </div>
    </div>
      </div>
         <Edit :detailTask="detailTask" v-if="showEditForm" @cancelEdit="cancelEdit " @refresh='refresh'><Edit>
  </div>
</template>

<script>
import Edit from './Edit'
import axios from "axios";
import url from "../config/config";
export default {
  name: "Card",
  props: ["detailTask"],
  data() {
    return {
      data: ["todo", "doing", "done", "completed"],
      showEditForm: false
    };
  },
  components: {
  Edit
  },
  created() {},
  methods: {
    geserKanan() {
      let ganti = "";
      if (this.detailTask.category === "todo") {
        ganti = "doing";
      } else if (this.detailTask.category === "doing") {
        ganti = "done";
      } else if (this.detailTask.category === "done") {
        ganti = "completed";
      }
      axios({
        url: `${url}/tasks/${this.detailTask.id}`,
        method: "PUT",
        headers: {
          token: localStorage.token
        },
        data: {
          category: ganti
        }
      })
        .then(data => {
          console.log(data);
          this.$emit("refresh");
        })
        .catch(err => {
          console.log(err);
        });
    },

    geserKiri() {
      let ganti2 = "";
      if (this.detailTask.category === "doing") {
        ganti2 = "todo";
      } else if (this.detailTask.category === "done") {
        ganti2 = "doing";
      } else if (this.detailTask.category === "completed") {
        ganti2 = "done";
      }
      axios({
        url: `${url}/tasks/${this.detailTask.id}`,
        method: "PUT",
        headers: {
          token: localStorage.token
        },
        data: {
          category: ganti2
        }
      })
        .then(data => {
          console.log(data);
          this.$emit("refresh");
        })
        .catch(err => {
          console.log(err);
        });
    },
    editForm() {
      this.showEditForm = !this.showEditForm
    },

    refresh() {
      this.$emit('refresh')
    },
    deleteData() {
      axios({
        url: `${url}/tasks/${this.detailTask.id}`,
        method: "DELETE",
        headers: {
          token: localStorage.token
        },
        data: {}
      })
        .then(data => {
          console.log(data);
          this.$emit("delete", {});
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelEdit() {
      this.showEditForm = !this.showEditForm
    }
  }
};
</script>
