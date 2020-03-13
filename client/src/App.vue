<!-- @format -->

<template>
  <div>
    <div id="login" v-if="!isLogin">
      <Login v-if="!isRegister" @showRegister="showRegister" @doLog="checkLogin"></Login>
      <Register v-if="isRegister" @showLogin="checkLogin"></Register>
    </div>
    <div v-if="isLogin" class="section-title mt-4">
      <Navbar @logoutButton="logOut"></Navbar>
      <div class="col ml-2">
        </div>
        <div class="container col-10 text-center">
          <AddData @addData="addData"></AddData>
         <b-button v-b-modal.modal-prevent-closing style="border-radius:50%; background-color:#79bae5 !important;"><i class="fas fa-plus"></i></b-button>
        </div>
      <div class="container">
      <Category :dataTask="dataTask" @refresh="refresh" @refresh2="refresh2" @delete="deleteData" @editForm="editForm"></Category>
    </div>
  </div>
    <Edit v-if="isEdit" @editForm="editForm"  :editData="editData"></Edit>
</template>

<script>
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import Edit from "./components/Edit"
import axios from "axios";
import Swal from "sweetalert2"
import AddData from "./components/addData"
import url from "./config/config"

export default {
  name: "App",
  components: {
    Login,
    Register,
    Navbar,
    Category,
    Edit,
    AddData
  },
  created() {
    this.checkLogin()
  },
  data() {
    return {
      editData: "",
      input_title : '',
      input_description: '',
      dataTask: {
        todo: null,
        doing: null,
        done: null,
        completed: null,
      },
      isLogin: false,
      isRegister: false,
      isEdit: false
    };
  },
  methods: {

    showRegister() {
   this.isRegister = true
    },

    findAll() {
      axios({
        url: `${url}/tasks`,
        method: "GET",
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          let todo = [];
          let doing = [];
          let done = [];
          let completed = [];
          data.data.forEach(el => {
            if (el.category === "todo") {
              todo.push(el);
            } else if (el.category === "doing") {
              doing.push(el);
            } else if (el.category === "done") {
              done.push(el);
            } else if (el.category === "completed") {
              completed.push(el);
            }
          });
          this.dataTask.todo = todo;
          this.dataTask.doing = doing;
          this.dataTask.done = done;
          this.dataTask.completed = completed;
        })
        .catch(err => {

        });
    },

    checkLogin() {
      if (localStorage.token) {
        this.isLogin = true
        this.findAll()
      } else {
        this.isRegister = false
        this.isLogin = false
        this.isEdit = false
      }
    },

    logOut() {
      localStorage.removeItem('token');
      this.checkLogin()
    },
    
    addData() {
      this.findAll()
    },

    refresh() {
      this.findAll()
    },

    refresh2() {
      this.findAll()
    },

    editForm(data) {
      console.log(data," INI APP");
      this.editData = data
      this.isEdit= true
    },
    
    deleteData() {
      this.findAll()
    }
  }
};
</script>

<style scoped></style>
