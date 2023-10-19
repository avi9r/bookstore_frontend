<template>
    <div>
        <h2>Registration</h2>
        <form @submit.prevent="registerUser">
            <input v-model="formData.name" placeholder="Name" required /><br />
            <input v-model="formData.email" type="email" placeholder="Email" required /><br />
            <input v-model="formData.password" type="password" placeholder="Password" required /><br />
            <button type="submit">Register</button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            formData: {
                name: '',
                email: '',
                password: ''
            }
        };
    },
    methods: {
        async registerUser() {
            try {
                const response = await axios.post('/api/register', this.formData);
                console.log('Registration successful:', response.data);
                // Handle successful registration, e.g., show success message, redirect, etc.
            } catch (error) {
                console.error('Registration failed:', error);
                // Handle registration error, e.g., show error message to the user
            }
        }
    }
};
</script>
  