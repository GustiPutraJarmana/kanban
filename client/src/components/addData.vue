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
        url: "http://localhost:3000/tasks",
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
        this.$emit('addData')
        console.log(data)
      })
      .catch(err => {
        console.log(err)
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