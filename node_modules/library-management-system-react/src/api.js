import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export async function login(email, password){
  const res = await api.post('/auth/login', { email, password })
  if(res.data.token) localStorage.setItem('token', res.data.token)
  return res.data
}

export function authHeader(){
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function fetchBooks(q = ''){
  const res = await api.get('/books', { params: { q } })
  return res.data
}

export async function fetchBook(id){
  const res = await api.get(`/books/${id}`)
  return res.data
}

export default api