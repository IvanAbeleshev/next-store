'use server'

import { Link } from '@/navigation'
import Image from 'next/image'
import { FaRegHeart } from 'react-icons/fa6'
import { SlBasket } from 'react-icons/sl'
import Profile from './Profile'
import { refreshAPI } from '@/utils/axiosInstances'
import { getTranslations } from 'next-intl/server'
import { ITranslationHeader } from '@/interfaces'

const Header = async () => {
  const t = await  getTranslations('components.header')

  const translation: ITranslationHeader = {
    email: t('email'),
    enter: t('enter'),
    googleAuth: t('googleAuth'),
    password: t('password'),
    registration: t('registration'),
    titleSignIn: t('titleSignIn'),
    titleSignUp: t('titleSignUp'),
  }

  const getTokens = async() => {
    try{
      const response = await refreshAPI.get('/auth/refresh')
      if(response && response.status === 200){
        return response.data
      }
  
      return null
    }catch{
      return null
    }
  }
  const tokens = await getTokens()
  return (
    <header className='sticky top-0 left-0 bg-background flex justify-between items-center py-5'>
      <div>
        <Link href={'/'}>
          <Image 
            alt='footer_logo yamagaz'
            src={'/img/logo-auto-market.png'}
            width={200}
            height={100}
          />
        </Link>
        <nav>

        </nav>
      </div>
      <div className='flex items-center gap-5'>
        <FaRegHeart className='w-5 h-5' />
        <SlBasket className='w-5 h-5' />
        <Profile 
          data={tokens} 
          translation={translation} 
          googleAuthHref={`${process.env.API_URL}/auth/google`}
        />
      </div>
    </header>
  )
}

export default Header