<!-- @format -->
<template>
  <div class="d-flex justify-content-space-round container-fluid mt-3" style="-webkit-box-shadow: 0px 0px 10px 5px rgba(124,201,214,1);
-moz-box-shadow: 0px 0px 10px 5px rgba(124,201,214,1);
box-shadow: 0px 0px 10px 5px rgba(124,201,214,1); border-radius:10px">
    <div class="card card-todo my-5" 
    style="border-radius: 20px; -webkit-box-shadow: 0px 15px 18px 1px rgba(0,0,0,1);
    -moz-box-shadow: 0px 15px 18px 1px rgba(0,0,0,1);
    box-shadow: 0px 15px 18px 1px rgba(0,0,0,1);" v-for="category in categories" :key="category">
      <div class="item-container" style="color:blue;">
        <div class="category container text-center mt-3" style="-webkit-box-shadow: inset 0px -12px 19px 0px rgba(55,167,171,1);
      -moz-box-shadow: inset 0px -12px 19px 0px rgba(55,167,171,1);
      box-shadow: inset 0px -12px 19px 0px rgba(55,167,171,1); border-radius:20px;">
          <h3>{{ category }}</h3>
        </div>
        <Card @refresh="refresh" @delete="deleteData" @editForm="editForm"
          v-for="data in dataTask[category.toLowerCase()]"
          :key="data.id"
          :detailTask="data" style="border : 2px black solid"
        ></Card>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "./Card";
export default {
  name: "Category",
  props: ["dataTask"],
  data() {
    return {
      categories: ["TODO", "DOING", "DONE", "COMPLETED"]
    };
  },
  components: {
    Card
  },
  methods : {
    refresh() {
      this.$emit('refresh')
    },
    deleteData() {
      this.$emit('delete')
    },
    editForm() {
      this.$emit("editForm")
    },
  }
};
</script>
