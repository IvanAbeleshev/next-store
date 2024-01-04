import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { FaTelegramPlane } from "react-icons/fa"
import { FaViber } from "react-icons/fa6"

const Footer = () => {
  const t = useTranslations()
  return(
    <footer className='flex flex-row justify-between p-8 rounded-t-4xl shadow-card bg-light'>
      <Link href={'/'}>
        <Image 
          alt='footer_logo yamagaz'
          src={'/img/logo-auto-market.png'}
          width={200}
          height={100}
        />
      </Link>
      <ul>
        <li>
          <Link href={'/favorite'} className='hover:text-main'>
            {t('components.footer.favorite')}
          </Link>
        </li>
        <li>
          <Link href={'/basket'} className='hover:text-main'>
            {t('components.footer.basket')}
          </Link>
        </li>
        <li>
          <Link href={'/contacts'} className='hover:text-main'>
            {t('components.footer.contacts')}
          </Link>
        </li>
      </ul>
      <div className='flex flex-col justify-between items-center'>
        <ul className='flex items-end gap-5'>
          <li>
            <Link href={'/'} locale='uk' className='hover:text-main'>
              Укр
            </Link>
          </li>
          <li>
            <Link href={'/'} locale='ru' className='hover:text-main'>
              Рус
            </Link>
          </li>
        </ul>
        <ul className='flex items-start gap-5'>
          <li><FaTelegramPlane className='w-10 h-10 hover:text-main' /></li>
          <li><FaViber className='w-10 h-10 hover:text-main'/></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer