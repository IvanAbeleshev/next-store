import { IPaginationData, IProduct } from '..'

export interface IProductList extends IPaginationData{
  data: IProduct[]
}