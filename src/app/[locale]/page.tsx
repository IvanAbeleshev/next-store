import ProductPreviewCard from '@/components/ProductPreviewCard/ProductPreviewCard'
import { IProductList } from '@/interfaces'
import { Link } from '@/navigation'
import { openAPI } from '@/utils/axiosInstances'
import { getTranslations } from 'next-intl/server'
import { FaBook } from 'react-icons/fa'

export default async function Home() {
  //will create service folder and pass this code there
  const getProductList = async ():Promise<IProductList> => {
    let productList
    try{
      productList = (await openAPI.get('/product?page=3')).data
    }catch(error){
      console.error('error of receive product list')
    }
    return productList
  }
  
  const productList = await getProductList()
  console.log(productList)

  const t = await getTranslations('pages.main')

  return(
    <section>

      <Link href={'/catalog'} className='text-2xl font-medium space-x-2 text-dark hover:text-main flex items-center w-fit mb-5'>
        <FaBook />
        <h1 className='inline'>
          {t('viewFullCatalog')}
        </h1>
      </Link>
      <h2 className='text-xl font-medium space-x-2 mb-5 text-gray'>
        {t('selectCategory')}
      </h2>
      <div 
        className='
          grid 
          grid-cols-1 
          md:grid-cols-2 
          xl:grid-cols-3 
          2xl:grid-cols-4 
          gap-y-8 
          place-items-center'
        >
        {productList.data.map(el=>
          <ProductPreviewCard key={el.id} />
        )}
      </div>
    </section>
  )
}
