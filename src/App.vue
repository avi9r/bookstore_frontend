<template>
  <div id="app">
    <header style="margin-top: -60px;">
      <!-- <router-link to="/">Home</router-link> | -->
      <nav class="navbar" style="background-color: skyblue;">
        <div v-if="$store.state.authToken" class="container">
          <div class="logo">
            <router-link to="/">Home</router-link> |
            <span>name:<span id="user-data">{{ $store.state.user.name }}</span> | email:<span
                id="user-data">{{ $store.state.user.email }}</span></span>
            <div v-if="$store.state.user.role == 'admin'" class="container">
              <span>{{ $store.state.user.role }}</span> |
              <router-link to="/add-book">Add Books</router-link>
            </div>
          </div>
          <div class="menu">

            <button id="logout-btn" @click="logoutUser">Logout</button>
          </div>
        </div>

        <div v-else class="container">
            <router-link to="/login"><button>Login</button></router-link> |
            <router-link to="/register"><button>Register</button></router-link>
        </div>
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
  },
  methods: {
    logoutUser() {
      this.$store.dispatch('logoutUser');
      this.$router.push('/login');

    }
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

#logout-btn {
  color: red;
}

#user-data {
  color: blue;
}
</style>
