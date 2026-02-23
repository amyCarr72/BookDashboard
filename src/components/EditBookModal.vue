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
      <UButton variant="outline" color="primary" @click="isEditModalOpen = false">Cancel</UButton>
      <UButton variant="outline" color="neutral" @click="onSaveEdit()">Save</UButton>
    </template>
  </UModal>
</template>
<script setup lang="ts">
import { useBooksStore } from '@/stores/books'
import type { Book } from '@/stores/types'
import { reactive, ref } from 'vue'

const booksStore = useBooksStore()

const emit = defineEmits(['submit'])

const isEditModalOpen = ref(false)
const { selectedBook } = booksStore

const state = reactive({
  title: selectedBook?.title || '',
  author: selectedBook?.author || '',
  ISBN: selectedBook?.ISBN || '',
  comments: selectedBook?.comments || '',
  rating: selectedBook?.rating || 0,
})

const onSaveEdit = () => {
  if (selectedBook) {
    const updatedBook: Book = { ...selectedBook, comments: state.comments, rating: state.rating }
    booksStore.updateBookById(updatedBook)
  }
  emit('submit')
}
</script>
