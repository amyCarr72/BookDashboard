<template>
  <PageHeader title="My Books" description="Manage your book collection and discover new reads.">
    <div class="mb-4 flex flex-col gap-4">
      <BookCard
        v-for="book in books"
        :key="book.id"
        :title="book.title"
        :author="book.author"
        :ISBN="book.ISBN"
        :rating="book.rating"
      />
    </div>
  </PageHeader>
</template>
<script setup lang="ts">
import { useBooksStore } from '@/stores/books'
import { computed } from 'vue'

const booksStore = useBooksStore()
const books = computed(() => booksStore.books)
</script>
