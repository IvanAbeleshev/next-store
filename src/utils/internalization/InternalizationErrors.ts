import { getTranslations } from "next-intl/server"

const authErrors = [
  {
    message: 'user with that email already exists',
    uid: 'userExist'
  },
  {
    message: 'password must be required',
    uid: 'requiredPassword'
  },
  {
    message: 'can not create new user',
    uid: 'userDidNotCreate'
  },
  {
    message: 'User does not exist',
    uid: 'userDoesNotExist'
  },
  {
    message: 'password is incorrect',
    uid: 'incorrectPassword'
  }
]

class InternalizationErrors{
  async getAuthErrorTranslation(message:string = ''):Promise<string>{
    const t = await getTranslations('components.header.errors')
    if(message){
      const errorMessage = authErrors.find(el=>el.message === message)
      if(errorMessage){
        return t(errorMessage.uid)
      }
    }
    return t('default')
  }
}


export default new InternalizationErrors()