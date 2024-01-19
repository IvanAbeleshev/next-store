import { IProductList } from '@/interfaces'
import { openAPI } from '@/utils/axiosInstances'
import Image from 'next/image'

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

  return(
    <div>
      {productList.data.map(el=>
        <div key={el.id}>
          {el.UID}
          {el.translations.length&&<span>{el.translations[0].fullName}</span>}
        </div>
      )}
    </div>
  )
}
