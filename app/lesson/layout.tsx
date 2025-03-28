interface Props {
    children: React.ReactNode;
}

import React from 'react'

const LessonLayout = ({children}: Props) => {
  return (
    <div className='flex flex-col h-full'>
        <div className='flex flex-col h-full w-full'>
        {children}
        </div>
    </div>
  )
}

export default LessonLayout