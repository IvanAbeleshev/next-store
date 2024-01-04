'use client'
import { AppStore, makeStore } from '@/store/store'
import { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'

interface IPropsStoreProvider{
  children: ReactNode
}
export default function StoreProvider({ children }:IPropsStoreProvider) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  
  return <Provider store={storeRef.current}>{children}</Provider>
}