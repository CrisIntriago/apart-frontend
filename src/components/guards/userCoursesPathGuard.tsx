"use client"
import PATHS from "@/constants/paths"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"


interface AuthGuardProps {
    children: React.ReactNode
}

const UserCoursesPath = ({ children }: AuthGuardProps) => {
    const pathname = usePathname()

    return (
        <>
            {children}
        </>
    )
}

export default UserCoursesPath