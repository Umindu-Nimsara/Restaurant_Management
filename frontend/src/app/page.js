import { Button } from '@/components/ui/button'
import React from 'react'
import Footer from '@/components/navBars/footer'
export default function page() {
  return (
    <div className='min-h-100'>page

      <h1 className='flex text-center text-orange-500'>Hello Google</h1>
      <Button>
        Click me
      </Button>
      <Footer />
    </div>
  )
}
