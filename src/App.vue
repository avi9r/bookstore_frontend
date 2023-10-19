<template>
  <div id="app">
    <header>
      <nav>
        <!-- <router-link to="/">Home</router-link> | -->
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </nav>
    </header>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import RegistrationForm from './components/RegistrationForm.vue';
// import LoginForm from './components/LoginForm.vue';

export default {
  name: 'App',
  components: {
    // RegistrationForm,
    // LoginForm,
    // HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
