<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="loginUser" style="display: inline-grid;">
            <input v-model="formData.email" type="email" placeholder="Email" required /><br />
            <input v-model="formData.password" type="password" placeholder="Password" required /><br />
            <button class="btn btn-primary" type="submit">Login</button>
        </form>
    </div>
    <!-- Error message -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
</template>
  
<script>
// import { mapActions } from 'vuex';
// import {setUser,setAuthToken} from './store'
import axios from '@/axios';

export default {
    data() {
        return {
            formData: {
                email: '',
                password: ''
            },
            errorMessage: '',

        };
    },
    methods: {
    async loginUser() {
      try {
        const response = await axios.post('/api/login', this.formData);
        console.log(response)
        // Assuming the server responds with user data and authentication token
        const user_Data = response.data.user;
        const auth_Token = response.data.token;

        // Commit mutations to update Vuex state
        this.$store.commit('setUser', user_Data);
        this.$store.commit('setAuthToken', auth_Token);

        // Redirect to a different route (for example, home page) after successful login
        this.$router.push('/');
            } catch (error) {
                console.error('Login failed:', error);
                this.errorMessage = 'Login failed. Please try again.';

            }
        }
    }
};
</script>
<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
