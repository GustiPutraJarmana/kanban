<!-- @format -->

<template>
  <div>
    <!-- <div id="login"> -->
    <div class="container align-items-center fadeIn first">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
          <div id="login-box" class="col-md-12 mx-auto">
            <form id="login-form" class="form" v-on:submit.prevent="register">
              <div class="container text-center fadeIn second">
                <i
                  class="far fa-address-card"
                  style="color: rgb(97, 196, 232); font-size:3.8rem;"
                ></i>
              </div>
              <h3 class="text-center text-info fadeIn second">Register</h3>
              <div class="form-group ">
                <label for="username" class="text-info fadeIn second">Usename:</label><br />
                <input
                  v-model="username"
                  type="username"
                  name="username"
                  id="username"
                  class="form-control fadeIn second"
                />
              </div>
              <div class="form-group">
                <label for="email" class="text-info fadeIn third">Email:</label><br />
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  id="email"
                  class="form-control fadeIn third"
                />
              </div>
              <div class="form-group">
                <label for="password" class="text-info fadeIn fourth">Password:</label><br />
                <input
                  v-model="password"
                  type="password"
                  name="password"
                  id="password"
                  class="form-control fadeIn fourth"
                />
              </div>
              <div class="form-group float-right fadeIn fourth">
                <br />
                <div id="google" class="col-sm-6 g-signin2 fadeIn fourth" data-onsuccess="onSignIn"></div>
                <button
                  style="border-radius : 25px"
                  type="submit"
                  name="submit"
                  class="btn btn-info btn-rounded mb-5 fadeIn fourth"
                  value="Sign Up"
                >
                  Register
                </button>
              </div>
             <div class="container mt-3 fadeIn fourth">
              <a href="#" v-on:click="showLogin" class="text-info fadeIn fourth"
                >back to login</a
              >
            </form>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export default Vue.extend({
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      axios({
        url: "http://localhost:3000/user/register",
        method: "POST",
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(data => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your just need to login!",
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit("showLogin");
        })
        .catch(err => {
          const error = err.response.data.message
        let errorStr = error.join('<li class="container text-left mx-5" style="margin-left: 6rem !important" >')
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: `<li class="container text-left mx-5" style="margin-left: 6rem !important">${errorStr}`,
            footer: "made by love "
          });
        });
    },
    showLogin() {
      this.$emit('showLogin')
    }
  }
});
</script>
