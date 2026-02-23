<template>
  <UModal :title="`Delete ${selectedBook.title}?`">
    <template #body> Are you sure you want to delete this book/review? </template>
    <template #footer>
      <UButton variant="outline" color="primary" @click="emit('submit')">Cancel</UButton>
      <UButton variant="outline" color="neutral" @click="onDeleteBook">Delete</UButton>
    </template>
  </UModal>
</template>
<script setup lang="ts">
import { useBooksStore } from '@/stores/books'
import { computed } from 'vue'

const booksStore = useBooksStore()
const emit = defineEmits(['submit'])

const selectedBook = computed(() => booksStore.selectedBook)

const onDeleteBook = () => {
  if (selectedBook.value) {
    booksStore.deleteBookById(selectedBook.value?.id)
  }
  emit('submit')
}
</script>
