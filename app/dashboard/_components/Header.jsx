import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
      {/* <Image src={'/next.svg'} alt='logo' width={40} height={40}/> */}
      <h1 className='text-primary font-bold'>CourseCraft</h1>
      <UserButton/>
    </div>
  )
}

export default Header
