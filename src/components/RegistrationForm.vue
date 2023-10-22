<template>
    <div>
        <h2>Registration</h2>
        <form @submit.prevent="registerUser" style="display: inline-grid;">
            <input v-model="formData.name" placeholder="Name" required /><br />
            <input v-model="formData.email" type="email" placeholder="Email" required /><br />
            <input v-model="formData.password" type="password" placeholder="Password" required /><br />
            <button class="btn btn-primary" type="submit">Register</button>
        </form>
    </div>
    <!-- Success message -->
    <div v-if="showSuccessMessage" class="success-message">
      Registration successful! You will be redirected to login shortly.
    </div>
    <!-- Error message -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
</template>
  
<script>
import axios from '@/axios'

export default {
    data() {
        return {
            formData: {
                name: '',
                email: '',
                password: ''
            },
            errorMessage : ''
        };
    },
    methods: {
        async registerUser() {
            try {
                const response = await axios.post('/api/register', this.formData);
                console.log('Registration successful:', response.data);
                this.showSuccessMessage = true;
                setTimeout(() => {
                    this.$router.push('/login'); 
                }, 1000);
            } catch (error) {
                console.error('Registration failed:', error);
                this.errorMessage = 'Registration failed. Please try again.';
            }
        }
    }
};
</script>
<style scoped>
.success-message {
  color: green;
  margin-top: 10px;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>