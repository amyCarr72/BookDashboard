<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-row justify-between">
    <div class="p-4 flex items-center mb-2 gap-4">
      <UIcon name="streamline:open-book-solid" class="size-6 text-amber-300" />
      <div>
        <h2 class="text-lg font-semibold">{{ book.title }}</h2>
        <p v-if="book.author" class="text-sm text-gray-500">{{ book.author }}</p>
        <p v-if="book.ISBN" class="text-sm text-gray-500">ISBN: {{ book.ISBN }}</p>
      </div>
    </div>
    <div class="p-4 flex flex-row gap-2 items-center">
      <div class="rating flex flex-row items-center">
        <UIcon
          v-for="num in 5"
          :key="num"
          name="material-symbols:star"
          class="size-4"
          :class="{ 'text-gray-500': num > book.rating, 'text-yellow-400': num <= book.rating }"
        />
        {{ book.rating }}/5
      </div>
      <UButton
        variant="outline"
        color="neutral"
        :icon="'material-symbols:edit'"
        size="xs"
        @click="openEditBook(book)"
      />
      <UButton
        variant="outline"
        color="neutral"
        :icon="'material-symbols:visibility'"
        size="xs"
        @click="openBook(book)"
      />
      <UButton
        variant="outline"
        color="neutral"
        :icon="'material-symbols:delete'"
        size="xs"
        @click="deleteBook(book)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Book } from '@/stores/types'
import { useBooksStore } from '@/stores/books'

const { book } = defineProps({
  book: {
    type: Object as () => Book,
    required: true,
  },
})

const emit = defineEmits(['edit-book', 'open-book', 'delete-book'])

const booksStore = useBooksStore()
const openEditBook = (book: Book) => {
  booksStore.setSelectedBook(book)
  // Logic to open the edit book modal or navigate to the edit page
  emit('edit-book')
}
const openBook = (book: Book) => {
  // Logic to open the book details view
  booksStore.setSelectedBook(book)
  emit('open-book')
}
const deleteBook = (book: Book) => {
  // Logic to delete the book from the collection
  booksStore.setSelectedBook(book)
  emit('delete-book')
}
</script>
