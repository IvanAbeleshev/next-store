import { refreshAPI } from '@/utils/axiosInstances'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/constants/accessConstants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  try{
    const result = await refreshAPI.get('/auth/refresh')
    const cookiesStore = cookies()
    if(result && result.status === 200 && result.data){
      cookiesStore.set(ACCESS_TOKEN, result.data.access_token)
      cookiesStore.set(REFRESH_TOKEN, result.data.refresh_token)
    }else{
      cookiesStore.delete(ACCESS_TOKEN)
      cookiesStore.delete(REFRESH_TOKEN)
    }
  }catch(error){
    return redirect('/')
  }

  return new Response('ok')
}