'use client'

import UserCoursesPath from '@/components/guards/userCoursesPathGuard'

const LmsLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <main className="">
      {children}
    </main>
  )
}

export default LmsLayout
