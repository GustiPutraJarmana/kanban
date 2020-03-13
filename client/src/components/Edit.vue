<!-- @format -->

<template>
  <div>
    <div class="container">
      <div class="container editForm">
        <b-form v-on:submit.prevent="edit">
          <b-form-group id="input-group-1" label="Title:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="editData.title"
              type="text"
              required
              placeholder="Enter title"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Description:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="editData.description"
              type="text"
              required
              placeholder="Description"
            ></b-form-input>
          </b-form-group>

          <div>
            <b-form-select
              v-model="selected"
              :options="options"
              size="sm"
              class="mt-3"
            ></b-form-select>
            <div class="mt-3"></div>
          </div>
          <div class="container text-danger">
            <b-button type="reset" variant="danger">Cancel</b-button>
            <b-button type="submit" variant="primary">Edit</b-button>
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
  props: ["editData"],
  data() {
    return {
      form: {
        title: "",
        description: "",
        category: ""
      },
      selected: this.editData.category,
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
    console.log(this.editData);
  },
  watch: {
    selected() {
      this.selected = this.editData.category;
    }
  },
  methods: {
    edit() {
      axios({
        url: `${url}/tasks/${this.detailTask.id}`,
        headers: {
          token: localStorage.token
        },
        body: {
          title: this.title,
          description: this.description,
          category: this.category
        }
      })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
