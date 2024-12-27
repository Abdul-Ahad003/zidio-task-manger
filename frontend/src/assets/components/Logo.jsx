import React from 'react';

const Logo = () => {
  return (
    <div className=' flex items-center gap-2.5'>
        <img src='../images/docs.png' alt='logo' className=' md:w-12 md:h-12 w-10 h-10'/>
        <span className=' md:text-[24px] text-[21px] font-Matemasie '>Task Manager</span>
    </div>
  )
}

export default Logo