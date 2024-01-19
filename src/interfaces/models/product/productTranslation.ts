import { TLanguage } from '@/interfaces'

export interface IProductTranslation{
  id: number,
  name: string,
  fullName: string,
  description: string | null,
  productId: number,
  languageShortName: TLanguage
}