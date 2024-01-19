'use server'

import { redirect } from '@/navigation'
import { REFRESH_TOKEN } from '@/utils/constants/accessConstants'
import { cookies } from 'next/headers'

const CheckAuth = () => {

  const refreshToken = cookies().get(REFRESH_TOKEN)
  if(!refreshToken?.value){
    redirect('/authentication')
  }

  return null
}

export default CheckAuth