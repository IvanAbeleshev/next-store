'use client'

import { signIn, signUp } from '@/actions/authActions'
import { ITranslationHeader } from '@/interfaces'
import { Link, redirect } from '@/navigation'
import { useEffect, useState } from 'react'
import { Input, InputGroup } from 'rsuite'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { FaUser, FaKey } from 'react-icons/fa'
import Image from 'next/image'
import { useFormState } from 'react-dom'

const initialState = {
  message: ''
}

interface IPropsAuthForm{
  translation: ITranslationHeader
  googleAuthHref: string
  modalMode: 'signin' | 'signup'
  closeModal?: () => void
}

const AuthForm = ( { translation, googleAuthHref, modalMode, closeModal }:IPropsAuthForm) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [stateSignIn, signInAction] = useFormState(signIn, initialState)
  const [stateSignUp, signUpAction] = useFormState(signUp, initialState)

  useEffect(()=>{
    if(stateSignIn.message === 'success'){
      if(closeModal){
        closeModal()
      }else{
        redirect('/')
      }
      
    }
  }, [stateSignIn])

  useEffect(()=>{
    if(stateSignUp.message === 'success'){
      if(closeModal){
        closeModal()
      }else{
        redirect('/')
      }
      
    }
  }, [stateSignUp])

  return(
  <form action={modalMode === 'signin' ? signInAction : signUpAction}>
    <div className='flex flex-col gap-8'>
      <InputGroup inside>
        <InputGroup.Addon>
          <FaUser />
        </InputGroup.Addon>
        <Input name='email' type='text' placeholder={translation.email}/>
      </InputGroup>
      <InputGroup inside>
        <InputGroup.Addon>
          <FaKey />
        </InputGroup.Addon>
        <Input name='password' type={isPasswordVisible ? 'text' : 'password'} placeholder={translation.password}/>
        <InputGroup.Button onClick={()=>setIsPasswordVisible(prev=>!prev)}>
          {isPasswordVisible ? <BsEye /> : <BsEyeSlash />}
        </InputGroup.Button>
      </InputGroup> 
    </div>

    {modalMode === 'signin' && stateSignIn?.message && stateSignIn.message !== 'success' &&
      <span className='block text-red-500 text-center my-2'>{stateSignIn.message}</span>
    }
    {modalMode === 'signup' && stateSignUp?.message && stateSignUp.message !== 'success' &&
      <span className='block text-red-500 text-center my-2'>{stateSignUp.message}</span>
    }
    
    <div className='flex flex-col w-full gap-3 mt-3'>
      <input 
        className='
          rounded-md 
          px-3 
          py-0.5 
          transition-colors 
          duration-500
          bg-background
          hover:bg-main 
          cursor-pointer'
        type='submit' 
        value={modalMode === 'signup' ? translation.registration : translation.enter}
      />
      <Link 
        href={googleAuthHref} 
        className='
          rounded-md 
          px-3 
          py-0.5 
          transition-colors 
          duration-500
          bg-background
          hover:bg-main 
          cursor-pointer
          group
          flex
          justify-center
          items-center
          gap-5'
      >
        <Image 
          src={'/img/Google-G-logo.svg'}
          alt='g-logo'
          width={20}
          height={20}
        />
        {translation.googleAuth}
      </Link>
    </div>
  </form>
  )
}

export default AuthForm