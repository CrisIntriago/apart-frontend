import { create } from 'zustand'
import { createSelectors } from './_createSelectors'
import { IProfile } from '@/types/user'
import { persist } from 'zustand/middleware'
import { ISessionStorage } from '../serverActions/authenticationCookiesAction'

export type IAccountState = {
  profile: IProfile
  session: ISessionStorage
}

const defaultState: IAccountState = {
  profile: {
    id: null,
    name: null,
    last_name: null,
    document_number: null,
    phone_number: null,
    email: null,
    user_auth_id: null,
    born_date: null,
  },
  session: {
    sessionToken: null,
    uid: null,
  },
}

export const accountStore = create<IAccountState>()(
  persist((set) => defaultState, {
    name: 'profile',
  }),
)

export const setProfileState = (profile: IProfile) =>
  accountStore.setState({ profile })

export const setSessionState = (session: ISessionStorage) =>
  accountStore.setState({ session })


export const removeAccountState = () =>
  accountStore.setState({ ...defaultState })

export const useAccountStore = createSelectors(accountStore)
