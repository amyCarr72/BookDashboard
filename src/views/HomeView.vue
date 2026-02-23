<template>
  <PageHeader title="My Books" description="Manage your book collection and discover new reads.">
    <div class="mb-4 flex flex-col gap-4">
      <BookCard
        v-for="book in books"
        :key="book.id"
        :book="book"
        @delete-book="isDeleteModalOpen = true"
        @edit-book="isEditModalOpen = true"
        @open-book="isViewModalOpen = true"
      />
    </div>
  </PageHeader>

  <DeleteBookModal
    v-model:open="isDeleteModalOpen"
    @submit="isDeleteModalOpen = !isDeleteModalOpen"
  />
  <ViewBookModal v-model:open="isViewModalOpen" />
  <EditBookModal
    v-model:open="isEditModalOpen"
    @submit="isEditModalOpen = !isEditModalOpen"
    :selected-book="selectedBook"
  />
</template>
<script setup lang="ts">
import { useBooksStore } from '@/stores/books'
import EditBookModal from '@/components/EditBookModal.vue'
import { computed, ref } from 'vue'
import ViewBookModal from '@/components/ViewBookModal.vue'

const booksStore = useBooksStore()
const books = computed(() => booksStore.books)
const selectedBook = computed(() => booksStore.selectedBook)

// Modals
const isEditModalOpen = ref(false)
const isViewModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
</script>
