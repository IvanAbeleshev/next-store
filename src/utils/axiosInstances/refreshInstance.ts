'use server'

import axios from 'axios'
import { cookies } from 'next/headers'
import { REFRESH_TOKEN } from '../constants/accessConstants'

const refreshAPI = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000
})

refreshAPI.interceptors.request.use(
  (config)=>{
    const cookiesStore = cookies()
    const refreshToken = cookiesStore.get(REFRESH_TOKEN)?.value
    if(refreshToken){
      config.headers['Authorization'] = 'Bearer ' + refreshToken
    }
    return config
  }
)

export { refreshAPI }