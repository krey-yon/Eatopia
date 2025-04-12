import HeroPage from '@/pages/HeroPage'
import React from 'react'
import {getCurrentSession} from "@/lib/cookie";

const LandingPage = async () => {


    const {user} = await getCurrentSession()

  return (
    <div className='flex flex-col bg-stone-100'>
        <HeroPage user={user} />
    </div>
  )
}

export default LandingPage