<template>
  <div class="container">
    <h2>Edit Book</h2>
    <div class="form-control">
      <form @submit.prevent="updateBook">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="bookData.title" required>
        </div>
        <div class="form-group">
          <label for="author">Author:</label>
          <input type="text" id="author" v-model="bookData.author" required>
        </div>
        <div class="form-group">
          <label for="isbn">ISBN:</label>
          <input type="text" id="isbn" v-model="bookData.isbn" required>
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <input type="text" id="description" v-model="bookData.description" required>
        </div>
        <div class="form-group">
          <label for="genre">Genre:</label>
          <input type="text" id="genre" v-model="bookData.genre" required>
        </div>
        <div class="form-group">
          <label for="published">Publication Date:</label>
          <input type="date" id="published" v-model="bookData.published" required>
        </div>
        <div class="form-group">
          <label for="publisher">publisher:</label>
          <input type="text" id="publisher" v-model="bookData.publisher" required>
        </div>
        <div class="form-group">
          <label for="image">Image:</label>
          <input type="file" id="image" ref="fileInput" accept="image/*" @change="handleImageUpload" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary" type="submit">Update Book</button>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import axios from '@/axios'

export default {
  data() {
    return {
      bookId: null,
      newImage: null,
      bookData: {}
    };
  },
  created() {
    this.bookId = this.$route.params.id;
    axios.get(`/api/books/${this.bookId}`)
      .then(response => {
        this.bookData = response.data;

      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  },
  methods: {
    handleImageUpload(event) {
      this.newImage = event.target.files[0];

    },
    async updateBook() {
      try {
        const formData = new FormData();
        formData.append('title', this.bookData.title);
            formData.append('author', this.bookData.author);
            formData.append('description', this.bookData.description);
            formData.append('published', this.bookData.published);
            formData.append('isbn', this.bookData.isbn);
            formData.append('genre', this.bookData.genre);
            formData.append('publisher', this.bookData.publisher);
          formData.append('image', this.newImage);

        const response = await axios.post(`/api/books-update/${this.bookId}`, formData);
        if (response.status === 200) {

          console.log('Book updated successfully:', response.data);

          alert('Book updated successfully!');

          this.$router.push(`/books/${this.bookId}`);
        } else {

          console.error('Unexpected status:', response.status);
        }
      } catch (error) {

        console.error('Error updating book:', error);

        alert('Failed to update book. Please try again later.');
      }
    }

  }
};
</script>
  