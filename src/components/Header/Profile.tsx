'use client'

import { ITranslationHeader } from '@/interfaces'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/constants/accessConstants'
import { setCookie, getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { Modal } from 'rsuite'
import AuthForm from '../AuthForm/AuthForm'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { jwtDecode } from 'jwt-decode'
import { setInitialUserState, setUserState } from '@/store/slices/userSlice'

interface IPropsProfile{
  translation: ITranslationHeader,
  googleAuthHref: string,
  data:{
    access_token: string,
    refresh_token: string
  } | undefined | null
}
const Profile = ( { data, translation, googleAuthHref }:IPropsProfile ) => {

  const dispatch = useAppDispatch()
  const userData = useAppSelector(state=>state.userSlice)

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

  return (
    <>
      {/* need create normal component for user menu and show name */}
      {userData.isAuthicated?
        <div className=''>
          {userData.userName}
        </div>:
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
          onClose={()=>{setIsModalOpen(false)}} 
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
