import { createStore } from 'vuex';
import axios from '@/axios';
import createPersistedState from 'vuex-persistedstate';


export default createStore({
  state: {
    user: null, 
    authToken: null, 
    books:[],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setAuthToken(state, token) {
      state.authToken = token;
    },
    setBooks(state, books) {
        state.books = books;
      },
  },
  plugins: [createPersistedState({
    key: 'bookstore', 
    paths: ['authToken', 'user'],
  })],
  actions: {
    async loginUser({ commit }, credentials) {
        
          const response = await axios.post('/api/login', credentials);
          const userData = response.data.user;
          const authToken = response.data.token;
  
          commit('setUser', userData);
          commit('setAuthToken', authToken);
          
          return userData; 
        
        
        
        
      },
    logoutUser({ commit }) {
        
        commit('setUser', null);
        commit('setAuthToken', null);
    },
    async updateUserProfile({ commit, state }, updatedUserData) {
        
          
          const response = await axios.put('/api/user', updatedUserData, {
                headers: {
                Authorization: `Bearer ${state.authToken}`
                }
            });
  
          const updatedUser = response.data.user;
          commit('setUser', updatedUser);
          
          return updatedUser; 
        
  },
  setBooks({ commit }, books) {
    commit('setBooks', books);
  },
  
}

});