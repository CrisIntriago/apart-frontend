'use client'
import PATHS, { PUBLIC_ROUTES } from '@/constants/paths'
import { accountStore, useAccountStore } from '@/data/store/accountStore'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoaderComponent from '@/components/ui/loaderComponent'
import { configureKnox } from '@/data/gateways/knoxGateway'

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { session } = useAccountStore()
  const [isHydrated, setIsHydrated] = useState(false)

  const validateValidProfileRoute = async () => {
    if (
      (session.uid || session.embedded) &&
      pathname !== PATHS.HOME &&
      PUBLIC_ROUTES.includes(pathname)
    ) {
      router.push(PATHS.HOME)
    }
    if (
      !session.uid &&
      !PUBLIC_ROUTES.includes(pathname)
    ) {
      router.push(PATHS.HOME)
    }
  }

  useEffect(() => {
    if (isHydrated) {
      validateValidProfileRoute()
    }
  }, [pathname, isHydrated])

  useEffect(() => {
    configureKnox()
    if (!isHydrated) {
      accountStore.persist.rehydrate()?.then(() => {
        setIsHydrated(true)
      })
    }
  }, [])

  return isHydrated ? <>{children}</> : <LoaderComponent />
}

export default AuthGuard
