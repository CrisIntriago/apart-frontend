'use client'
import { PATHS, PUBLIC_ROUTES } from '@/constants/paths'
import { accountStore, useAccountStore } from '@/data/store/accountStore'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoaderComponent from '@/components/ui/loaderComponent'

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { session } = useAccountStore()
  const [isHydrated, setIsHydrated] = useState(false)

  const checkValidRoute = async () => {
    if (
      !session.uid &&
      !PUBLIC_ROUTES.includes(pathname)
    ) {
      router.push(PATHS.LOGIN)
    }
  }

  useEffect(() => {
    if (isHydrated) {
      checkValidRoute()
    }
  }, [pathname, isHydrated])

  useEffect(() => {
    if (!isHydrated) {
      accountStore.persist.rehydrate()?.then(() => {
        setIsHydrated(true)
      })
    }
  }, [])

  return isHydrated ? <>{children}</> : <LoaderComponent />
}

export default AuthGuard
