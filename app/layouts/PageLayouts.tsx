import React, { FC } from 'react'
import Footer from '~/components/Footer'
import Navbar from '~/components/Navbar'

const PageLayouts:FC<{children : React.ReactNode}> = ({children}) => {
  return (
    <div className=''>
        <Navbar position='relative' variant/>
        {children}
        <Footer/>

      
    </div>
  )
}

export default PageLayouts
