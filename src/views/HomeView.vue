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

  <UModal v-model:open="isDeleteModalOpen" title="Are you sure?">
    <template #body> Are you sure you want to delete this book/review? </template>
    <template #footer>
      <UButton variant="outline" color="primary" @click="isDeleteModalOpen = false">Cancel</UButton>
      <UButton variant="outline" color="neutral" @click="onDeleteBook">Delete</UButton>
    </template>
  </UModal>
  <ViewBookModal v-model:open="isViewModalOpen" />
  <EditBookModal v-model:open="isEditModalOpen" @submit="isEditModalOpen = !isEditModalOpen" />
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

const onDeleteBook = () => {
  if (selectedBook.value) {
    booksStore.deleteBookById(selectedBook.value?.id)
  }
  isDeleteModalOpen.value = false
}
</script>
