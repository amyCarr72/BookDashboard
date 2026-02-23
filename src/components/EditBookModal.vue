<template>
  <UModal title="Edit Book">
    <template #body>
      <UForm :state="state" class="flex flex-col gap-4">
        <UFormField label="Book Title" name="title">
          <UInput v-model="state.title" disabled />
        </UFormField>
        <UFormField label="Author Information" name="author">
          <UInput v-model="state.author" disabled />
        </UFormField>
        <UFormField label="ISBN Information" name="ISBN">
          <UInput v-model="state.ISBN" disabled />
        </UFormField>
        <UFormField label="Comments" name="comments">
          <UTextarea v-model="state.comments" placeholder="Brief comments on the book..." />
        </UFormField>
        <UFormField label="Rating" name="rating">
          <USlider v-model="state.rating" :min="0" :max="5" />
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <UButton variant="outline" color="primary" @click="emit('submit')">Cancel</UButton>
      <UButton variant="outline" color="neutral" @click="onSaveEdit()">Save</UButton>
    </template>
  </UModal>
</template>
<script setup lang="ts">
import { useBooksStore } from '@/stores/books'
import type { Book } from '@/stores/types'
import { ref, computed } from 'vue'

const booksStore = useBooksStore()

const emit = defineEmits(['submit'])

const selectedBook = computed(() => booksStore.selectedBook)

const state = ref({
  title: selectedBook.value?.title,
  author: selectedBook.value?.author,
  ISBN: selectedBook.value?.ISBN,
  comments: selectedBook.value?.comments,
  rating: selectedBook.value?.rating,
})

const onSaveEdit = async () => {
  if (selectedBook.value && state.value.comments && state.value.rating) {
    const updatedBook: Book = {
      ...selectedBook.value,
      comments: state.value.comments,
      rating: state.value.rating,
    }
    await booksStore.updateBookById(updatedBook)
  }
  emit('submit')
}
</script>
