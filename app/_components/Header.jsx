import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between p-5 shadow-sm'>
      {/* <Image src={'/next.svg'} alt='Logo' width={150} height={100} /> */}
      <h1 className='font-bold text-primary'>CourseCraft</h1>
      <a href='./dashboard'><Button>Get Started</Button></a>
    </div>
  )
}

export default Header
