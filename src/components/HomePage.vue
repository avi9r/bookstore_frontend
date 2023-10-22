<template>
  <div>
    <h1>All Books</h1>
  </div>
  <book-list></book-list>
</template>
  
<script>
// import axios from '@/axios'
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
  
  },
};
</script>



