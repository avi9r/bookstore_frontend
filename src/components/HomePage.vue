<template>
    <div>
      <h1>All Books</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.title }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        books: []
      };
    },
    mounted() {
      // Fetch the list of books from your API endpoint
      axios.get('/api/books')
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    }
  };
  </script>
  