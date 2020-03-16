<!-- @format -->

<template>
  <div>
    <div id="login" v-if="!isLogin">
      <Login v-if="!isRegister" @showRegister="showRegister" @doLog="checkLogin"></Login>
      <Register v-if="isRegister" @showLogin="checkLogin"></Register>
    </div>
    <div v-if="isLogin" class="section-title">
      <Navbar @logoutButton="logOut"></Navbar>
      <div class="col ml-2">
        </div>
        <div class="container col-10 text-center">
          <AddData @addData="addData"></AddData>
         <b-button v-b-modal.modal-prevent-closing style="border-radius:50%; background-color:#79bae5 !important;"><i class="fas fa-plus"></i></b-button>
        </div>
      <div class="container">
      <Category :dataTask="dataTask" @refresh="refresh" @delete="deleteData"  @editForm="isEdit"></Category>
    </div>
  </div>
</template>

<script>
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
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
    AddData,
  },
  created() {
    this.checkLogin()
  },
  data() {
    return {
      dataTask: {
        todo: null,
        doing: null,
        done: null,
        completed: null,
      },
      isLogin: false,
      isRegister: false,
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
      }
    },

    logOut() {
      var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
      localStorage.removeItem('token');
      this.checkLogin()
       Swal.fire({
            position: "center",
            icon: "success",
            title: "Logging Out!",
            showConfirmButton: false,
            timer: 1500
          });
    },
    
    addData() {
      this.findAll()
    },

    refresh() {
      this.findAll()
    },
    deleteData() {
      this.findAll()
    },

    isEdit() {
      isEdit= true
    },
  }
};
</script>

<style scoped></style>
