'use server'
import axios from 'axios'

const openAPI = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000
})

export { openAPI }