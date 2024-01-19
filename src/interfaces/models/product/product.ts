import { IProductImage, IProductTranslation } from '..'

export interface IProduct{
  id: number,
  UID: string,
  article: string | null,
  translations: IProductTranslation[]
  availableAmount: {
    asamount: string
  } | null,
  priceAndDiscount:{
    productId: number,
    price: number,
    discount: number,
  } | null,
  images: IProductImage[]
}