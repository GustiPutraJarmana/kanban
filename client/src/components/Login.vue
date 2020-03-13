<!-- @format -->

<template>
  <div>
    <!-- <div id="login"> -->
    <div class="container align-items-center">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
          <div id="login-box" class="col-md-12 mx-auto">
            <form id="login-form" class="form" v-on:submit.prevent="login">
              <div class="container text-center mt-2">
                <i
                  class="far fa-user-circle"
                  style="color: rgb(97, 196, 232); font-size:4.5rem;"
                ></i>
              </div>
              <h3 class="text-center text-info">Login</h3>
              <div class="form-group">
                <label for="email" class="text-info">Email:</label>
                <br />
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  id="email"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="password" class="text-info">Password:</label>
                <br />
                <input
                  v-model="password"
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                />
              </div>
              <div class="form-group float-right">
                <br />
                <button
                  style="border-radius : 25px"
                  type="submit"
                  name="submit"
                  class="btn btn-info btn-rounded mb-4"
                  value="Sign Up"
                >
                  LOGIN
                </button>
              </div>
            </form>
            <div id="register-link" class="text-right">
              <a href="#" v-on:click="showRegister" class="text-info"
                >Register here</a
              >
            </div>
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
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      axios({
        url: "http://localhost:3000/user/login",
        method: "POST",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(data => {
          localStorage.setItem("token", data.data.token);
          this.$emit("doLog");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "do you have any account?"
          });
        });
    },
    showRegister() {
      this.$emit("showRegister");
    }
  }
});
</script>
