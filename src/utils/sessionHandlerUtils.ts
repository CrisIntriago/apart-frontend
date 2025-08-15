import { setSessionStorageCookies } from "@/data/serverActions/authenticationCookiesAction"
import { setSessionState } from "@/data/store/accountStore"


const isClientRequest = () => typeof window !== 'undefined'

export const handleLoginSuccess = (response: any) => {
  const accessToken = response.data?.token;
  const userId = response.data?.user.id;
  const hasCourse =
    Array.isArray(response.data?.user.courses) &&
    response.data.user.courses.length > 0;
  if (accessToken) {
    setSharedSession({ accessToken, uid: userId, hasCourse });
  } else {
    console.error("No access token received in response:", response);
  }
};

export const setSharedSession = async ({
  accessToken,
  uid,
  hasCourse,
  onSuccessLogin,
}: {
  accessToken: string
  uid: string
  hasCourse: boolean
  onSuccessLogin?: () => void
}) => {
  const sessionData = {
    sessionToken: accessToken,
    uid: uid,
    hasCourse: hasCourse,
  }
  try {
    await setSessionStorageCookies(sessionData)
    const isClient = isClientRequest()
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