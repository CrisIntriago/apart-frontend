'use client'

import UserCoursesPath from '@/components/guards/userCoursesPathGuard'

const LmsLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <main className="">
      <UserCoursesPath>{children}</UserCoursesPath>
    </main>
  )
}

export default LmsLayout
