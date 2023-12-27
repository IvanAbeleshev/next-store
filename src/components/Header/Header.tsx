import { Link } from '@/navigation'
import Image from 'next/image'
import { FaRegHeart } from 'react-icons/fa6'
import { SlBasket } from 'react-icons/sl'

const Header = () => {
  return (
    <header className='sticky top-0 left-0 bg-background flex justify-between items-center py-5'>
      <div>
        <Image 
          alt='footer_logo yamagaz'
          src={'/img/logo-auto-market.png'}
          width={200}
          height={100}
        />
        <nav>

        </nav>
      </div>
      <div className='flex items-center gap-5'>
        <FaRegHeart className='w-5 h-5' />
        <SlBasket className='w-5 h-5' />
        <Link href={'http://localhost:8000/auth/google'}>ENTER</Link>
      </div>
    </header>
  )
}

export default Header