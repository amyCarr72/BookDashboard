import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBooksStore = defineStore('books', () => {
  const books = ref()
  const getBooks = computed(() => {
    return books.value
  })

  const refreshBooks = async () => {
    //fetch the books here after adjustments and set the books ref
  }

  const init = () => {
    //fetch the initial book here and set the books ref
  }

  return {
    books,
    getBooks,
    init,
  }
})
