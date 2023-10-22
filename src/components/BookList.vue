<template>
  <div class="container">
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
    <div class="row" style="justify-content: center;">
      <div v-for="book in $store.state.books" :key="book.id" class="col-md-3 custom-card">
        <b-card>
          <img :src="book.image" @click="goToBookDetail(book)" class="card-img-top" alt="Book Cover" />
          <b-card-body>
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">Author: {{ book.author }}</p>
            <p class="card-text">Genre: {{ book.genre }}</p>
          </b-card-body>
          <div v-if="$store.state.user.role == 'admin'">
            <button @click="editBook(book)">Edit</button>
            <button @click="deleteBook(book.id)">Delete</button>
          </div>
        </b-card>
      </div>
    </div>
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
      bookId: Number,
    };
  },
  mounted() {
    
    axios.get('/api/books')
      .then(response => {
        this.books = response.data;
        this.$store.dispatch('setBooks', this.books); 

      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  },
  methods: {
    goToBookDetail(book) {
      this.$router.push({ name: 'BookDetail', params: { id: book.id }, props: book });
    },
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
    editBook(book) {
      this.$router.push({ name: 'EditBook', params: { id: book.id }, props: book });
    },
    async deleteBook(bookId) {
      try {
        var retVal = confirm("Do you want to Delete ?");
        if (retVal == true) {

          const response = await axios.delete(`/api/books/${bookId}`);
          if (response.status === 200) {
            
            alert('Book deleted successfully!');
            window.location.reload(false)
            // this.$router.push('/'); 
          } else {
            
            console.error('Unexpected status:', response.status);
          }
        }
      } catch (error) {
        
        console.error('Error deleting book:', error);
        
        alert('Failed to delete book. Please try again later.');
      }
    }
  },
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

  .card-title {
    font-size: 1.2rem;

    margin-bottom: 10px;

  }

  .card-text {
    color: #555;

  }

  .card-img-top {
    width: 80%;
    height: auto;
    max-height: 250px;
  }
}
</style>
  