'use client'

import ModuleMod from "@/components/modules/module/moduleModule"

export default function ModulePage({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <div className="flex-grow container mx-auto flex overflow-hidden">
      <ModuleMod id={id} />
    </div>
  )
}
