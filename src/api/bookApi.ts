import type { Book } from '@/stores/types'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5224'

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getBooks`)
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}

export const fetchBookById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getBook/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error)
    throw error
  }
}

export const createBook = async (book: Book) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addBook`, book)
    return response.data
  } catch (error) {
    console.error('Error creating book:', error)
    throw error
  }
}

export const updateBook = async (id: number, book: Book) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/books/${id}`, book)
    return response.data
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error)
    throw error
  }
}

export const deleteBook = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/deleteBook/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error)
    throw error
  }
}

export const addInitalBooks = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addInitialBooks`)
    console.log('response: ', response)
    return response.data
  } catch (error) {
    console.error('Error adding initial books:', error)
    throw error
  }
}
