import { setSessionStorageCookies } from "@/data/serverActions/authenticationCookiesAction"
import { setSessionState } from "@/data/store/accountStore"


const isClientRequest = () => typeof window !== 'undefined'

export const handleLoginSuccess = (response: any) => {
  const accessToken = response.data?.token;
  console.log(response.data)
  console.log("cristian")
  const userId = response.data?.user.id;
  const hasCourse =
    Array.isArray(response.data?.user.courses) &&
    response.data.user.courses.length > 0;
  const hasAccess = response.data?.user.has_access === true;
  if (accessToken) {
    setSharedSession({ accessToken, uid: userId, hasCourse, hasAccess });
  } else {
    console.error("No access token received in response:", response);
  }
};

export const setSharedSession = async ({
  accessToken,
  uid,
  hasCourse,
  onSuccessLogin,
  hasAccess,
}: {
  accessToken: string
  uid: string
  hasCourse: boolean
  onSuccessLogin?: () => void
  hasAccess: boolean
}) => {
  const sessionData = {
    sessionToken: accessToken,
    uid: uid,
    hasCourse: hasCourse,
    hasAccess: hasAccess,
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