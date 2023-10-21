import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import RegistrationForm from './components/RegistrationForm.vue';
import LoginForm from './components/LoginForm.vue';
import store from './components/store';
import BookDetail from './components/BookDetail.vue';


const routes = [
  { path: '/', component: () => HomePage, meta: { requiresAuth: true } },
  { path: '/login', component: LoginForm },
  { path: '/register',component: RegistrationForm },
  { path: '/books/:id',name:'BookDetail',component: BookDetail,props: true,},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.authToken) {
    next('/login');
  } else {
    next();
  }
});
export default router;
