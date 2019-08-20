<template>
  <form class="form" @submit.prevent="login">
    <h1 class="form__title">
      Login
    </h1>
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
      <button :disabled="isProcessing" class="btn btn__primary">Login</button>
    </div>
  </form>
</template>

<script>
import Flash from '../../helpers/flash'
import { post } from '../../helpers/api'
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: {},
      isProcessing: false
    }
  },
  methods: {
    login() {
      this.isProcessing = true
      this.error = {}
      post(`/api/login`, this.form)
        .then((res) => {
          if(res.data.authenticated) {
            Flash.setSuccess('Login success')
            this.$router.push('/')
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