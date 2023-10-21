<template>
  <div>
    <h1>All Books</h1>
  </div>
  <book-list></book-list>
  <div class="container">
    <div class="row" style="justify-content: center;">
      <div v-for="book in $store.state.books" :key="book.id" @click="goToBookDetail(book)" class="col-md-3 custom-card">
        <b-card>
          <img :src="book.image" class="card-img-top" alt="Book Cover" />
          <b-card-body>
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">Author: {{ book.author }}</p>
            <p class="card-text">Genre: {{ book.genre }}</p>
            <!-- Add more book properties here -->
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
  <!-- <div v-for="book in books" :key="book.id">
    </div> -->
</template>
  
<script>
import axios from '@/axios'
import BookList from './BookList.vue';

export default {
  components: {
    BookList,
  },
  data() {
    return {
      books: []
    };
  },
  methods: {
    goToBookDetail(book) {
      this.$router.push({ name: 'BookDetail', params: { id: book.id }, props: book });
    },
  },
  mounted() {
    // Fetch the list of books from your API endpoint
    axios.get('/api/books')
      .then(response => {
        this.books = response.data;
        this.$store.dispatch('setBooks', this.books); // Dispatch action to save books data in the store

      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }
};
</script>
<style scoped>
.custom-card {
  border: 2px solid #007bff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  transition: box-shadow 0.3s ease;
  height: 100%;
  margin: 10px 25px;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  /* Additional styling for card content (optional) */
  .card-title {
    font-size: 1.2rem;
    /* Title font size */
    margin-bottom: 10px;
    /* Bottom margin for the title */
  }

  .card-text {
    color: #555;
    /* Text color */
  }

  .card-img-top {
    width: 100%;
    height: auto;
    max-height: 200px;
  }
}</style>


