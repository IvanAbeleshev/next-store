'use server'

import AuthForm from '@/components/AuthForm/AuthForm'
import WrapperAuthForm from '@/components/AuthForm/WrapperAuthForm'
import { ITranslationHeader } from '@/interfaces'
import { getTranslations } from 'next-intl/server'

const AuthenticationPage = async () => {
  const t = await  getTranslations('components.header')

  const translation: ITranslationHeader = {
    email: t('email'),
    enter: t('enter'),
    googleAuth: t('googleAuth'),
    password: t('password'),
    registration: t('registration'),
    titleSignIn: t('titleSignIn'),
    titleSignUp: t('titleSignUp'),
    logout: t('logout'),
    basket: t('basket'),
    favorite: t('favorite'),
    profile: t('profile')
  }

  return (
    <section className='flex justify-center bg-white rounded-4xl shadow-card p-5 my-5'>
      <WrapperAuthForm 
        googleAuthHref={`${process.env.API_URL}/auth/google`}
        translation={translation}
      />
    </section>
  )
}

export default AuthenticationPage