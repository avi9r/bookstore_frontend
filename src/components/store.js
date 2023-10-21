import { createStore } from 'vuex';
import axios from '@/axios';
import createPersistedState from 'vuex-persistedstate';


export default createStore({
  state: {
    user: null, // User data will be stored here after successful login
    authToken: null, // Authentication token received from the server
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
        // try {
          const response = await axios.post('/api/login', credentials);
          const userData = response.data.user;
          const authToken = response.data.token;
  
          commit('setUser', userData);
          commit('setAuthToken', authToken);
          
          return userData; // Optional: return user data for further use in components
        // } catch (error) {
        //   // Handle login error, e.g., show error message to the user
        //   throw error;
        // }
      },
    logoutUser({ commit }) {
        // Clear user data and authentication token from the state
        commit('setUser', null);
        commit('setAuthToken', null);
    },
    async updateUserProfile({ commit, state }, updatedUserData) {
        // try {
          // Assuming you have an API endpoint for updating user profile
          const response = await axios.put('/api/user', updatedUserData, {
                headers: {
                Authorization: `Bearer ${state.authToken}`
                }
            });
  
          const updatedUser = response.data.user;
          commit('setUser', updatedUser);
          
          return updatedUser; 
        // } catch (error) {
        //   // Handle update user profile error, e.g., show error message to the user
        //   throw error;
        // }
    // Actions for login, logout, and other user-related operations
    
  },
  setBooks({ commit }, books) {
    commit('setBooks', books);
  },
  
}

});