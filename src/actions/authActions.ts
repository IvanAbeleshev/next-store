'use server'

import { openAPI } from '@/utils/axiosInstances'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/constants/accessConstants'
import { isAxiosError } from 'axios'
import { cookies } from 'next/headers'

export const signIn = async(presState:any, actionData: FormData): Promise<{message: string}> => {
  try{
    const response = await openAPI.post('/auth/signin', {
      login: actionData.get('email'),
      password: actionData.get('password')
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
        message: error.response?.data?.message || error.message
      })
    }
    return {
      message: 'algorithm error'
    }
  }


}