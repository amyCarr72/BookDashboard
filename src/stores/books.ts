import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Book } from './types'
import { fetchBooks, addInitalBooks, createBook, updateBook, deleteBook } from '@/api/bookApi'

export const useBooksStore = defineStore('books', () => {
  const books = ref<Book[]>([])

  const selectedBook = ref<Book | null>(null)

  const getBooks = computed(() => {
    return books.value
  })

  const getSearchedBookResults = async (searchTerm: string) => {
    const searchResults = ref<Book[]>([])
    books.value.forEach((book: Book) => {
      if (
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLocaleLowerCase().includes(searchTerm.toLowerCase())
      ) {
        //add the book to the searchedBooks list
        searchResults.value.push(book)
      }
    })
    return searchResults.value
  }

  const refreshBooks = async () => {
    //fetch the books here after adjustments and set the books ref
    try {
      const fetchedBooks = await fetchBooks()
      books.value = fetchedBooks
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  const init = async () => {
    //fetch the initial book here and set the books ref
    try {
      await addInitalBooks()
      refreshBooks()
    } catch (error) {
      console.error('Error fetching Initial books:', error)
    }
  }

  const addBook = async (book: Book) => {
    try {
      await createBook(book)
      refreshBooks()
    } catch (error) {
      console.error('Error adding book:', error)
    }
  }

  const deleteBookById = async (id: number) => {
    try {
      await deleteBook(id)
      refreshBooks()
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }

  const updateBookById = async (id: number, book: Book) => {
    try {
      await updateBook(id, book)
      refreshBooks()
    } catch (error) {
      console.error('Error updating book:', error)
    }
  }

  return {
    books,
    selectedBook,
    getBooks,
    init,
    refreshBooks,
    getSearchedBookResults,
    addBook,
    deleteBookById,
    updateBookById,
  }
})
