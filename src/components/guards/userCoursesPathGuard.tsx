"use client"
import { PATHS } from "@/constants/paths"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"


interface AuthGuardProps {
    children: React.ReactNode
}

const UserCoursesPath = ({ children }: AuthGuardProps) => {
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (pathname === PATHS.HOME) {
            router.push(PATHS.USER_COURSES.ROOT)
            console.log("Envío al dashboard desde UserCoursesPathGuard, pathname:", pathname)
        }
    }, [pathname, router])

    return <>{children}</>
}

export default UserCoursesPath