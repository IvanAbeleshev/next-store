'use client'

import { ITranslationHeader } from '@/interfaces'
import AuthForm from './AuthForm'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { setUserState } from '@/store/slices/userSlice'
import { jwtDecode } from 'jwt-decode'
import { getCookie } from 'cookies-next'
import { ACCESS_TOKEN } from '@/utils/constants/accessConstants'

interface IPropsWrapperAuthForm {
  translation: ITranslationHeader
  googleAuthHref: string
}

const WrapperAuthForm = (props:IPropsWrapperAuthForm) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const router = useRouter()
  const dispatch = useAppDispatch()

  const dispatchUserInfo = (token: string | undefined) => {
    if(token){
      const tokenData = jwtDecode<{id:number, email:string}>(token)
      dispatch(setUserState(
        {
          isAuthicated: true,
          userId: tokenData.id,
          userName: tokenData.email
        }
      ))
    }
  }

  return (
    <div className='min-w-[35%]'>
      <h1 className='text-3xl text-center mb-5'>
        {authMode === 'signin' ? 
          props.translation.titleSignIn : 
          props.translation.titleSignUp
        }
      </h1>
      <AuthForm 
        {...props} 
        modalMode={authMode}
        closeModal={()=>{
          dispatchUserInfo(getCookie(ACCESS_TOKEN))
          router.push('/')
        }}
      />
      <div className='flex flex-row-reverse mt-5'>
        {authMode === 'signin'?
          <span 
            className='transition-colors hover:text-main cursor-pointer'
            onClick={()=>setAuthMode('signup')}
          >
            {props.translation.titleSignUp}
          </span> :
          <span 
            className='transition-colors hover:text-main cursor-pointer'
            onClick={()=>setAuthMode('signin')}
          >
            {props.translation.titleSignIn}
          </span>
        }
      </div>
    </div>
  )
}

export default WrapperAuthForm