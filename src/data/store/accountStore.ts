import { create } from "zustand";
import { createSelectors } from "./_createSelectors";
import { persist } from "zustand/middleware";
import { ISessionStorage } from "../serverActions/authenticationCookiesAction";
import { StudentProfile } from "@/types/user";

export type IAccountState = {
  profile: StudentProfile | null;
  session: ISessionStorage;
};

const defaultState: IAccountState = {
  profile: null,
  session: {
    sessionToken: null,
    uid: null,
  },
};

export const accountStore = create<IAccountState>()(
  persist((set) => defaultState, {
    name: "profile",
  })
);

export const setProfileState = (profile: StudentProfile) =>
  accountStore.setState({ profile });

export const setSessionState = (session: ISessionStorage) =>
  accountStore.setState({ session });

export const removeAccountState = () =>
  accountStore.setState({ ...defaultState });

export const useAccountStore = createSelectors(accountStore);
