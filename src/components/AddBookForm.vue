<template>
  <UModal title="Add a new Book" id="addBookForm">
    <template #body>
      <UForm :state="form" class="gap-2">
        <UFormField label="Title" required>
          <UInput v-model="form.title" placeholder="Enter book title" />
        </UFormField>

        <UFormField label="Author" required>
          <UInput v-model="form.author" placeholder="Enter author name" />
        </UFormField>

        <UFormField label="ISBN" required>
          <UInput v-model="form.ISBN" placeholder="Enter ISBN" />
        </UFormField>

        <UFormField label="Description">
          <UTextarea v-model="form.description" placeholder="Enter book description" />
        </UFormField>

        <UFormField label="Rating">
          <USlider :min="0" :max="5" v-model="form.rating" placeholder="What is your rating" />
        </UFormField>

        <UFormField label="Comments">
          <UInput v-model="form.comments" placeholder="Any comments?" />
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <UFormField>
        <UButton @click="handleSubmit" form="addBookForm" type="submit" color="primary"
          >Submit</UButton
        >
      </UFormField>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { useBooksStore } from '@/stores/books'
import { reactive, type Reactive } from 'vue'
import type { Book } from '@/stores/types'

const emit = defineEmits(['submit'])

const form: Reactive<Book> = reactive({
  id: 0,
  title: '',
  author: '',
  ISBN: '',
  description: '',
  rating: 0,
  comments: '',
  coverImageUrl: '',
  notes: '',
})

const booksStore = useBooksStore()
const handleSubmit = async () => {
  // Add logic to handle form submission, e.g., API call
  await booksStore.addBook(form)
  emit('submit')
}
</script>
