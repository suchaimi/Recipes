<template>
  <div class="container">
    <div class="navbar">
      <div class="navbar__brand">
        <router-link to="/">Recipe Box</router-link>
      </div>
      <ul class="navbar__list">
        <li class="navbar__item" v-if="!auth.api_token">
          <router-link to="/login">Login</router-link>
        </li>
        <li class="navbar__item" v-if="!auth.api_token">
          <router-link to="/register">Register</router-link>
        </li>
        <li class="navbar__item" v-if="auth.api_token">
          <router-link to="logout">Logout</router-link>
        </li>

      </ul>
    </div>
    <div class="flash flash__success" v-if="flash.success">
      {{ flash.success }}
    </div>
    <div class="flash flash__error" v-if="flash.error">
      {{ flash.error }}
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Flash from './helpers/flash'
import Auth from './store/auth'

export default {
  created() {
    Auth.initialize()
  },
  data() {
    return {
      flash: Flash.state,
      auth: Auth.state
    }
  }
}
</script>