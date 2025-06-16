'use server'

import { cookies } from 'next/headers'

export interface ISessionStorage {
  sessionToken: string | null
  uid: string | null
  embedded?: boolean
}

export const setSessionStorageCookies = async ({
  sessionToken,
  uid,
  embedded,
}: ISessionStorage): Promise<void> => {
  const cookieStore = cookies()
  const isProduction = process.env.NODE_ENV === 'production'
  cookieStore.set('sessionToken', sessionToken || '', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
  })
  cookieStore.set('uid', uid || '', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
  })
  cookieStore.set('embedded', embedded ? 'true' : 'false', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
  })
}

export const getSessionStorageCookies = async (): Promise<ISessionStorage> => {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  const uid = cookieStore.get('uid')
  return {
    sessionToken: sessionToken?.value || null,
    uid: uid?.value || null,
  }
}

export const removeSessionStorageCookies = async (): Promise<void> => {
  const cookieStore = cookies()
  cookieStore.delete('sessionToken')
  cookieStore.delete('uid')
  cookieStore.delete('embedded')
}
