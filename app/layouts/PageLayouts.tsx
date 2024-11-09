import React, { FC } from 'react'
import Footer from '~/components/Footer'
import Navbar from '~/components/Navbar'

const PageLayouts:FC<{children : React.ReactNode,userData? : {name : string}}> = ({children,userData}) => {
  return (
    <div className=''>
        <Navbar userData={userData} position='relative' variant/>
        {children}
        <Footer/>

      
    </div>
  )
}

export default PageLayouts
