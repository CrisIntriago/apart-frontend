"use client"
import PATHS from "@/constants/paths"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


interface AuthGuardProps {
    children: React.ReactNode
}

const UserCoursesPath = ({ children }: AuthGuardProps) => {
    const router = useRouter()
    useEffect(() => {
        router.push(PATHS.USER_COURSES.PROFILE)
    }, [router])

    return (
        <>
            {children}
        </>
    )
}

export default UserCoursesPath