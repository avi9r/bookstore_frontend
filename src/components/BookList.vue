<template>
    <div>
      <input v-model="searchQuery" placeholder="Search by title, author, ISBN, genre...">
      <select v-model="selectedFilter">
        <option value="">Filter by...</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="isbn">ISBN</option>
        <option value="genre">Genre</option>
        <option value="published">Published date</option>
      </select>
      <button @click="search">Search</button>
  
    </div>
  </template>
  
  <script>
  import axios from '@/axios'

  export default {
    data() {
      return {
        searchQuery: '',
        selectedFilter: '',
        books: [], 
      };
    },
    methods: {
      search() {
        
        axios.get('/api/search', { params: { query: this.searchQuery, filter: this.selectedFilter } })
          .then(response => {
            this.books = response.data;
            this.$store.dispatch('setBooks', this.books); 
            
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
  };
  </script>
  