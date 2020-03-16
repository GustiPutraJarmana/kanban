<!-- @format -->

<template>
  <div>
    <!-- <div id="login"> -->
    <div class="container align-items-center fadeIn first">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
          <div id="login-box" class="col-md-12 mx-auto">
            <form id="login-form" class="form" v-on:submit.prevent="login">
              <div class="container text-center mt-2 fadeIn second">
                <i
                  class="far fa-user-circle"
                  style="color: rgb(97, 196, 232); font-size:4.5rem;"
                ></i>
              </div>
              <h3 class="text-center text-info fadeIn second">Login</h3>
              <div class="form-group">
                <label for="email" class="text-info fadeIn third">Email:</label>
                <br />
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  id="email"
                  class="form-control fadeIn third"
                />
              </div>
              <div class="form-group fadeIn fourth">
                <label for="password" class="text-info">Password:</label>
                <br />
                <input
                  v-model="password"
                  type="password"
                  name="password"
                  id="password"
                  class="form-control fadeIn fourth"
                />
              </div>
              <div
                class="form-group float-right fadeIn fourth"
              >
                <br />
                <button
                  style="border-radius : 25px"
                  type="submit"
                  name="submit"
                  class="btn btn-info btn-rounded mb-4 fadeIn fourth"
                  value="Sign Up"
                >
                  LOGIN
                </button>
              </div>
            </form>
            <div
              class="container text-right mt-5 d-flex justify-content-around"
            >
              <a
                href="#"
                v-on:click="showRegister"
                class="text-info fadeIn fourth mt-2"
                >register here</a
              >
              <GoogleLogin
                :params="params"
                :renderParams="renderParams"
                :onSuccess="onSuccess"
                style="border-radius: 50px"
              ></GoogleLogin>
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
import GoogleLogin from "vue-google-login";
import url from "../config/config"

export default Vue.extend({
  name: "Login",
  components: {
    GoogleLogin
  },
  data() {
    return {
      email: "",
      password: "",
      params: {
        client_id:
          "557747062211-7rtl0ke8dfgp49f83ln1t4tvod1q3pgh.apps.googleusercontent.com"
      },
      renderParams: {
        width: 30,
        height: 30,
        longtitle: true
      }
    };
  },
  methods: {
    login() {
      axios({
        url: `${url}/user/login`,
        method: "POST",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(data => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Logging in",
            showConfirmButton: false,
            timer: 3000
          });
          localStorage.setItem("token", data.data.token);
          this.$emit("doLog");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Something went wrong!!! \n ${err.response.data.message}.`,
            footer: "do you have any account?"
          });
        });
    },
    showRegister() {
      this.$emit("showRegister");
    },
    onSuccess(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      console.log('on succes')
      console.log(id_token)
      axios({
        url: `${url}/user/googleLogin`,
        method: "POST",
        data: {
          token: id_token
        }
      })
        .then(data => {
          console.log(data.data)
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Logging in",
            showConfirmButton: false,
            timer: 3000
          });
          localStorage.setItem("token", data.data.token);
         this.$emit("doLog")
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Something went wrong!!! \n make sure you register your email.`,
            footer: "do you have any account?"
          });
        });
    }
  }
});
</script>
