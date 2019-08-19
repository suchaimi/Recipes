<template>
  <form class="form" @submit.prevent="register">
    <h1 class="form__title">
      Create an account
    </h1>
    <div class="form__group">
      <label>Name</label>
      <input type="text" class="form__control" v-model="form.name">
      <small class="error__control" v-if="error.errors">{{error.errors.name[0]}}</small>
    </div>
    <div class="form__group">
      <label>Email</label>
      <input type="text" class="form__control" v-model="form.email">
      <small class="error__control" v-if="error.errors">{{error.errors.email[0]}}</small>
    </div>
    <div class="form__group">
      <label>Password</label>
      <input type="password" class="form__control" v-model="form.password">
      <small class="error__control" v-if="error.errors">{{error.errors.password[0]}}</small>
    </div>
    <div class="form__group">
      <label>Confirm Password</label>
      <input type="password" class="form__control" v-model="form.password_confirmation">
      <!-- <small class="error__control" v-if="error.password_confirmation">{{error.password_confirmation}}</small> -->
    </div>
    <div class="form__group">
      <button :disabled="isProcessing" class="btn btn__primary">Register</button>
    </div>
  </form>
</template>

<script>
import { post } from '../../helpers/api'
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      error: {},
      isProcessing: false
    }
  },
  methods: {
    register() {
      this.isProcessing = true
      this.error = {}
      post(`/api/register`, this.form)
        .then((res) => {
          if(res.data.registered) {
            this.$router.push('/login')
          }
          this.isProcessing = false
        })
        .catch((err) => {
          // console.log(err.response.data.errors.email)
          if(err.response.status === 422){
            this.error = err.response.data
          }
          // console.log(this.error);
          this.isProcessing = false
        })
    }
  }
}
</script>