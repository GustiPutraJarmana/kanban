<!-- @format -->

<template>
  <div>
    <div class="container">
      <div class="container editForm">
        <b-form v-on:submit.prevent="edit">
          <b-form-group id="input-group-1" label="Title:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="title"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Description:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="description"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <div>
             <b-form-group
            id="input-group-1"
            label="Category:"
            label-for="input-1"
          >
            <b-form-select
              v-model="selected"
              :options="options"
              size="sm"
              class="mt-3"
            ></b-form-select>
            <div class="mt-3">

            </div>
          </div>
          <div class="container text-center">
            <b-button type="submit" variant="primary" >Edit</b-button>
            <b-button type="button" @click="cancelEdit" variant="danger">Cancel</b-button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "../config/config";

export default {
  props: ["detailTask"],
  data() {
    return {
        title: this.detailTask.title,
        description: this.detailTask.description,
      selected: this.detailTask.category,
      options: [
        { value: null, text: "Please select an option" },
        { value: "todo", text: "Todo" },
        { value: "doing", text: "Doing" },
        { value: "done", text: "Done" },
        { value: "completed", text: "Completed" }
      ],
      show: true
    };
  },
  mounted() {
   console.log(this.detailTask)
  },
  methods: {
    edit() {
      axios({
        url: `${url}/tasks/${this.detailTask.id}`,
        method : 'PUT',
        headers: {
          token: localStorage.token
        },
        data: {
          title: this.title,
          description: this.description,
          category: this.selected
        }
      })
        .then(data => {
          this.$emit('refresh')
          if (data.data[0].category === this.detailTask.category) {
          this.$emit('refresh')
            console.log(data.data[0].category, 'masuuuuukkkk sini');
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelEdit() {
      this.$emit('cancelEdit')
    }
  }
};
</script>
