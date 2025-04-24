import { Button } from '@/components/ui/button'
import React from 'react'

function Header({getstart=true}) {
 
  return (
    <div className='flex justify-between p-5 shadow-sm'>
      {/* <Image src={'/next.svg'} alt='Logo' width={150} height={100} /> */}
      <h1 className='font-bold text-primary'>CourseCraft</h1>
      {getstart && <Button className='bg-primary text-white'>Get Started</Button>}
      {!getstart && <Button  className='bg-primary text-white'>Dashboard</Button>}
    </div>
  )
}

export default Header
