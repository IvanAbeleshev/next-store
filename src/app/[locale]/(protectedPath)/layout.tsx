import CheckAuth from '@/components/CheckAuth/CheckAuth'
import { ReactNode } from 'react'

interface IPropsProtectedPathLayout{
  children: ReactNode
}

const ProtectedPathLayout = ( { children }:IPropsProtectedPathLayout ) => {

  return(
    <>
      <CheckAuth />
      {children}
    </>
  )
}

export default ProtectedPathLayout