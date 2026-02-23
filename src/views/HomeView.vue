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

  <UModal v-model:open="isEditModalOpen" title="Edit Book">
    <template #body>
      <UForm :state="tempBookEdit" class="flex flex-col gap-4">
        <UFormField label="Book Title" name="title">
          <UInput v-model="tempBookEdit.title" disabled />
        </UFormField>
        <UFormField label="Author Information" name="author">
          <UInput v-model="tempBookEdit.author" disabled />
        </UFormField>
        <UFormField label="ISBN Information" name="ISBN">
          <UInput v-model="tempBookEdit.ISBN" disabled />
        </UFormField>
        <UFormField label="Comments" name="comments">
          <UTextarea v-model="tempBookEdit.comments" placeholder="Brief comments on the book..." />
        </UFormField>
        <UFormField label="Rating" name="rating">
          <USlider v-model="tempBookEdit.rating" :min="0" :max="5" />
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <UButton variant="outline" color="primary" @click="isEditModalOpen = false">Cancel</UButton>
      <UButton variant="outline" color="neutral" @click="isEditModalOpen = false">Save</UButton>
    </template>
  </UModal>

  <UModal v-model:open="isViewModalOpen" title="Book Details">
    <template #body>
      <div v-if="selectedBook" class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold">{{ selectedBook?.title }}</h2>
        <p class="text-sm text-gray-500">Author: {{ selectedBook?.author }}</p>
        <p class="text-sm text-gray-500">ISBN: 1234567890</p>
        <div class="rating flex flex-row items-center">
          <UIcon
            v-for="n in 5"
            :key="n"
            name="material-symbols:star"
            class="size-4"
            :class="{
              'text-gray-500': n > selectedBook?.rating,
              'text-yellow-400': n <= selectedBook?.rating,
            }"
          />
          {{ selectedBook?.rating }}/5
        </div>
        <p class="text-sm text-gray-700">
          This is a brief description of the book. It provides an overview of the plot, characters,
          and themes.
        </p>
      </div>
    </template>
  </UModal>
</template>
<script setup lang="ts">
import { useBooksStore } from '@/stores/books'
import { computed, ref, reactive } from 'vue'

const booksStore = useBooksStore()
const books = computed(() => booksStore.books)

const selectedBook = computed(() => booksStore.selectedBook)

const tempBookEdit = reactive({
  title: selectedBook.value?.title || '',
  author: selectedBook.value?.author || '',
  ISBN: selectedBook.value?.ISBN || '',
  comments: selectedBook.value?.comments || '',
  rating: selectedBook.value?.rating || 0,
})
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
