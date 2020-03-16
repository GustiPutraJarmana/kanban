<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add Data Task"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk(dataAdd)"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit({title,description})">
        <b-form-group
          :state="nameState"
          label="Title"
          label-for="name-input"
          invalid-feedback="Title is required"
        >
          <b-form-input
            id="name-input"
            v-model="dataAdd.title"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :state="nameState"
          label="Description"
          label-for="name-input"
          invalid-feedback="Description is required"
        >
          <b-form-input
            id="name-input"
            v-model="dataAdd.description"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>


    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from "sweetalert2"
import url from "../config/config"
  export default {
    data() {
      return {
        name: '',
        nameState: null,
        submittedNames: [],
        dataAdd: {
        }
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
      axios({
        url: `${url}/tasks`,
        method: 'POST',
        headers : {
            token : localStorage.getItem('token')
        },
        data: {
          title : this.dataAdd.title,
          description : this.dataAdd.description
        }
      })
      .then(data => {
        this.dataAdd.title = '',
        this.dataAdd.description = '',
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Data has added sucessful to Todo!",
            showConfirmButton: false,
            timer: 1500
          });
        this.$emit('addData')
      })
      .catch(err => {
        console.log(err.response.data.message)

         const error = err.response.data.message
        let errorStr = error.join('<li class="container text-left mx-5" style="margin-left: 6rem !important" >')
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: `<li class="container text-left mx-5" style="margin-left: 6rem !important">${errorStr}`,
            footer: "made by love "
          });
      })
      
        this.handleSubmit()
      },
      handleSubmit(data) {
          console.log(data)
          
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },
      
    }
  }
</script>