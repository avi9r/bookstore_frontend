import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import RegistrationForm from './components/RegistrationForm.vue';
import LoginForm from './components/LoginForm.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginForm },
  { path: '/register', component: RegistrationForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
