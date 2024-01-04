import StoreProvider from '@/components/providers/storeProvider/StoreProvider'
import 'rsuite/dist/rsuite-no-reset.min.css'

interface IPropsProvidersLayouts{
  children: React.ReactNode,
}


export default function ProvaidersLayout({
  children
}: IPropsProvidersLayouts) {

  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  )
}
