'use client'
import UserCoursesPath from "@/components/guards/userCoursesPathGuard"

const LmsLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <UserCoursesPath>
      {children}
    </UserCoursesPath>
  )
}

export default LmsLayout
