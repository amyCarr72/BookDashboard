import type { Book } from '@/stores/types'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5224'

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getBooks`)
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
    return error
  }
}

export const fetchBookById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getBook/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error)
    return error
  }
}

export const createBook = async (book: Book) => {
  try {
    const apiBook = {
      title: book.title,
      isbn: book.ISBN,
      author: book.author,
      rating: book.rating,
      comments: book.comments,
      noteStatus: book.notes,
      coverImageUrl: book.coverImageUrl,
    }
    const response = await axios.post(`${API_BASE_URL}/addBook`, apiBook)
    return response.data
  } catch (error) {
    console.error('Error creating book:', error)
    return error
  }
}

export const updateBook = async (book: Book) => {
  try {
    const apiBook = {
      Id: book.id,
      title: book.title,
      isbn: book.ISBN,
      author: book.author,
      rating: book.rating,
      comments: book.comments,
      noteStatus: book.notes,
      coverImageUrl: book.coverImageUrl,
    }
    const response = await axios.put(`${API_BASE_URL}/books/${apiBook.Id}`, apiBook)
    return response.data
  } catch (error) {
    console.error(`Error updating book ${book.title}`, error)
    return error
  }
}

export const deleteBook = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/deleteBook/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error)
    return error
  }
}

export const addInitalBooks = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addInitialBooks`)
    console.log('response: ', response)
    return response.data
  } catch (error) {
    console.error('Error adding initial books:', error)
    return error
  }
}
