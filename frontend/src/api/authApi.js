import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/auth'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const registerUser = async ({ username, password }) => {
  const response = await api.post('/register', { username, password })
  return response.data
}

export const loginUser = async ({ username, password }) => {
  const response = await api.post('/login', { username, password })
  return response.data
}