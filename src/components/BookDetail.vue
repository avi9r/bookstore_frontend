<template>
    <div class="container">

        <div v-if="this.bookDetail" class="row book-detail">
            <div class="col-md-4">

                <img :src="this.bookDetail.image" class="card-img-top" alt="Book Cover" />
            </div>
            <div class="col-md-8">

                <h2>{{ this.bookDetail.title }}</h2>
                <p><strong>Author:</strong> {{ this.bookDetail.author }}</p>
                <p><strong>ISBN:</strong> {{ this.bookDetail.isbn }}</p>
                <p><strong>Genre:</strong> {{ this.bookDetail.genre }}</p>
                <p><strong>Description:</strong> {{ this.bookDetail.description }}</p>
                <p><strong>Publisher:</strong> {{ this.bookDetail.publisher }}</p>

                <p><strong>Publication Date:</strong> {{ this.bookDetail.published }}</p>
                <button class="btn btn-primary" @click="purchase()">Buy Now</button>
            </div>

        </div>
    </div>
</template>
  
<script>
import axios from '@/axios'

export default {
    data() {
        return {
            bookId: null,
            bookDetail: null,
        };
    },
    created() {
        this.bookId = this.$route.params.id;
        // this.fetchBookDetails(this.bookId);
        axios.get(`/api/books/${this.bookId}`)
                .then(response => {
                    this.bookDetail = response.data;
                })
                .catch(error => {
                    console.error('Error fetching books:', error);
                });
    },
    methods: {
        purchase(){
            alert("Thank you for Shoping with us!")
        }
    },
};
</script>
  
<style scoped>
.book-detail {
    margin: 0 auto;
    margin-top: 10px;
    padding: 20px;
    border-radius: 5px;
    width: 100%;
    height: fit-content;
    max-height: 200px;
}
</style>
  