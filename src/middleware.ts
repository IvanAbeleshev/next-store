import createMiddleware from 'next-intl/middleware'
import { locales, localePrefix} from './navigation'
 
export default createMiddleware({
  // A list of all locales that are supported
  locales,
  defaultLocale: 'uk',
  localePrefix
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(uk|ru)/:path*']
}