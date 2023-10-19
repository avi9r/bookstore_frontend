<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="loginUser">
            <input v-model="formData.email" type="email" placeholder="Email" required /><br />
            <input v-model="formData.password" type="password" placeholder="Password" required /><br />
            <button type="submit">Login</button>
        </form>
    </div>
</template>
  
<script>
// import axios from 'axios';
import axios from '@/axios';
export default {
    data() {
        return {
            formData: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        async loginUser() {
            try {
                const response = await axios.post('/api/login', this.formData);
                console.log('Login successful:', response.data);
                // Handle successful login, e.g., store user data in Vuex state, redirect, etc.
            } catch (error) {
                console.error('Login failed:', error);
                // Handle login error, e.g., show error message to the user
            }
        }
    }
};
</script>
  