import { setSessionStorageCookies } from "@/data/serverActions/authenticationCookiesAction"
import { setSessionState } from "@/data/store/accountStore"


const isClientRequest = () => typeof window !== 'undefined'

export const setSharedSession = async ({
  accessToken,
  uid,
  onSuccessLogin,
}: {
  accessToken: string
  uid: string
  onSuccessLogin?: () => void
}) => {
  const sessionData = {
    sessionToken: accessToken,
    uid: uid,
  }
  try {
    await setSessionStorageCookies(sessionData)
    const isClient = isClientRequest()
    console.log('isClient:', isClient)
    console.log('sessionData:', sessionData)
    if (isClient) {
      setSessionState(sessionData)
      if (onSuccessLogin) {
        onSuccessLogin()
      }
    }
  } catch (error) {
    console.error('Error de inicio de sesión:', error)
  }
}