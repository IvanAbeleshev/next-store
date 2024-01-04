'use server'

import axios, { AxiosRequestConfig } from 'axios'
import { cookies } from 'next/headers'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/accessConstants'

const protectedAPI = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000
})

protectedAPI.interceptors.request.use(
  (config)=>{
    const cookiesStore = cookies()
    const accessToken = cookiesStore.get(ACCESS_TOKEN)?.value
    if(accessToken){
      config.headers.setAuthorization('Bearer ' + accessToken)
    }
    return config
  }
)

protectedAPI.interceptors.response.use(
  (res)=>{
    return res
  },
  async (err) => {
    const cookiesStore = cookies()
    const originalConfig: AxiosRequestConfig = err.config
    if (originalConfig.url !== "/" && err.response) {
      const refresh = cookiesStore.get(REFRESH_TOKEN)?.value
      if (err.response.status === 401&&refresh) {
        try {
          const rs = await fetch('/checkAuth')
          return protectedAPI(originalConfig)
        }catch (_error) {
        
          return Promise.reject(_error)
        }
      }
    }
    return Promise.reject(err)
  }
)

export { protectedAPI }