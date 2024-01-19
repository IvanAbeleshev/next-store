'use client'

import { ITranslationHeader } from '@/interfaces'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/constants/accessConstants'
import { setCookie, getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { Dropdown, Modal } from 'rsuite'
import AuthForm from '../AuthForm/AuthForm'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { jwtDecode } from 'jwt-decode'
import { setInitialUserState, setUserState } from '@/store/slices/userSlice'
import { FaRegHeart, FaRegUser, FaBasketShopping } from 'react-icons/fa6'
import { IoLogOutOutline } from 'react-icons/io5'
import { Link, useRouter } from '@/navigation'
import { logout } from '@/actions/authActions'
import { useFormState } from 'react-dom'

const initialState = {
  message: ''
}

interface IPropsProfile{
  translation: ITranslationHeader,
  googleAuthHref: string,
  data:{
    access_token: string,
    refresh_token: string
  } | undefined | null
}
const Profile = ( { data, translation, googleAuthHref }:IPropsProfile ) => {

  const [stateLogout, logoutAction] = useFormState(logout, initialState)

  const dispatch = useAppDispatch()
  const userData = useAppSelector(state=>state.userSlice)
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'signup'|'signin'>('signin')

  useEffect(()=>{
    if(data){
      setCookie(ACCESS_TOKEN, data.access_token)
      setCookie(REFRESH_TOKEN, data.refresh_token)
      dispatchUserInfo(String(data.access_token))
    }else{
      dispatch(setInitialUserState())
    }
  }, [])

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

  useEffect(()=>{

    if(stateLogout.message === 'success'){
      dispatch(setInitialUserState())
      router.push('/')
    }
  },[stateLogout])

  return (
    <>
      {userData.isAuthicated?
        <Dropdown title={userData.userName} noCaret placement='bottomEnd'>
          <Dropdown.Item>
            <Link href={'/profile'} className='flex items-center gap-1'>
              <FaRegUser className='w-5 h-5'/>
              {translation.profile}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href={'/favorite'} className='flex items-center gap-1'>
              <FaRegHeart className='w-5 h-5' />
              {translation.favorite}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href={'/basket'} className='flex items-center gap-1'>
              <FaBasketShopping className='w-5 h-5' />
              {translation.basket}
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <form action={logoutAction}>
              <button className='flex items-center gap-1'>
                <IoLogOutOutline className='w-5 h-5' /> 
                {translation.logout}
              </button>
            </form>
          </Dropdown.Item>
        </Dropdown>:
        <div 
          onClick={ () => setIsModalOpen(true) }
          className='hover:text-main cursor-pointer'
        >
          {translation.titleSignIn}
        </div>
      }

      {isModalOpen && 
        <Modal 
          open={isModalOpen} 
          onClose={()=>{
            setIsModalOpen(false)
            setModalMode('signup')
          }} 
          overflow={false}
        >
          <Modal.Header>
            <Modal.Title className='text-center'>
              { modalMode === 'signin' ?
                  translation.titleSignIn :
                  translation.titleSignUp
              }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AuthForm 
              googleAuthHref={googleAuthHref}
              translation={translation}
              modalMode={modalMode}
              closeModal={()=>{
                setIsModalOpen(false)
                setModalMode('signin')
                dispatchUserInfo(getCookie(ACCESS_TOKEN))
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            {modalMode === 'signin'?
              <span 
                className='transition-colors hover:text-main cursor-pointer'
                onClick={()=>setModalMode('signup')}
              >
                {translation.titleSignUp}
              </span> :
              <span 
                className='transition-colors hover:text-main cursor-pointer'
                onClick={()=>setModalMode('signin')}
              >
                {translation.titleSignIn}
              </span>
            }
          </Modal.Footer>
        </Modal>
      }
    </>
  )
}

export default Profile
