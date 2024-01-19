'use server'

import { openAPI } from '@/utils/axiosInstances'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/constants/accessConstants'
import InternalizationErrors from '@/utils/internalization/InternalizationErrors'
import { isAxiosError } from 'axios'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const signIn = async(prevState:any, actionData: FormData): Promise<{message: string}> => {
  try{
    const response = await openAPI.post('/auth/signin', {
      login: actionData.get('email')?.toString().trim(),
      password: actionData.get('password')?.toString().trim()
    })
    const {access_token, refresh_token} = response.data
    cookies().set(ACCESS_TOKEN, access_token)
    cookies().set(REFRESH_TOKEN, refresh_token)
    return ({
      message: 'success'
    })
  }catch(error){
    if(isAxiosError(error)){
      console.log(error.message)
      return ({
        message: await InternalizationErrors.getAuthErrorTranslation(error.response?.data?.message) 
      })
    }
    return {
      message: await InternalizationErrors.getAuthErrorTranslation() 
    }
  }
}

export const signUp = async(prevState:any, actionData: FormData): Promise<{message: string}> => {
  try{
    const response = await openAPI.post('/auth/signup', {
      email: actionData.get('email')?.toString().trim,
      password: actionData.get('password')?.toString().trim()
    })
    const {access_token, refresh_token} = response.data
    cookies().set(ACCESS_TOKEN, access_token)
    cookies().set(REFRESH_TOKEN, refresh_token)
  
    return ({
      message: 'success'
    })
  }catch(error){
    if(isAxiosError(error)){
      return ({
        message: await InternalizationErrors.getAuthErrorTranslation(error.response?.data?.message) 
      })
    }
    return {
      message: await InternalizationErrors.getAuthErrorTranslation() 
    }
  }
}

export const logout = async (prevState:any, actionData:FormData): Promise<{message: string}> => {
  cookies().delete(ACCESS_TOKEN)
  cookies().delete(REFRESH_TOKEN)

  return ({
    message: 'success'
  })
}