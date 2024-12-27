import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import Logo from './Logo';
import toast, { Toaster } from 'react-hot-toast';

const Navbar = ({ search, setsearch }) => {

  const [error, setError] = useState('')
  const [user, setuser] = useState()
  const [isLoggedIn, setisLoggedIn] = useState(null)
  const [mobileSearch, setmobileSearch] = useState(false)

  const fetchUser = async () => {
    let a = await fetch('https://docs-flow.onrender.com' + '/fetchUser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId')
      }),
    })
    let data = await a.json()

    if (data.success == true) {
      setuser(data.user)
    }
    else {
      setError(data.message)
    }
  }

  const logout = async () => {
    let a = await fetch('https://docs-flow.onrender.com' + '/fetchUser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId')
      }),
    })
    let data = await a.json()

    if (data.success == true) {
      toast.success('Logout Successful')
      localStorage.removeItem('userId')
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('token')
    }
    else {
      setError(data.message)
    }
  }

  const setuserlog = () => {
    if (localStorage.getItem('isLoggedIn') == 'true') {
      setisLoggedIn(true)
    }
    else {
      setisLoggedIn(false)
    }
  }

  useEffect(() => {
    fetchUser()
    setuserlog()
  }, [user, isLoggedIn])

  return (
    <header className='sticky top-0 z-30 bg-[#F4F4F4]'>
      <nav className='navbar flex items-center md:py-2.5 md:px-12  py-1.5 px-3 justify-between '>
        <Link>
          <Logo />
        </Link>


        <div className="flex items-center  gap-3">
          <div className=" hidden md:flex items-center border bg-white w-full rounded-lg">
            <img src='../search.svg' alt='' className=' mx-1 w-6 h-6' />
            <input onChange={(e) => { setsearch(e.target.value) }} value={search} className='pr-3 pl-1.5 w-full border-none outline-none py-1.5 rounded-lg' type="text" placeholder='Search...' />
          </div>

          <div onClick={() => { setmobileSearch(!mobileSearch) }} className=' bg-white md:hidden block rounded-full p-1'>
            <img src='./search.svg' alt='' className=' w-6 h-6' />
          </div>
          {isLoggedIn && <>
            <button onClick={logout} className=' md:block hidden  py-1.5 px-3 bg-[#cf0909] text-white rounded-lg border-0 transition-all hover:bg-[#ff2222] font-abee'>Logout</button>
            <button onClick={logout} className=' md:hidden block p-1  bg-[#cf0909] text-white rounded-full border-0 transition-all hover:bg-red-600 font-abee'><img src='./logout.svg' alt='log' className=' w-6 h-6' /></button>

            <div className=' md:block hidden cursor-pointer'><Avatar name={user ? user.name : ''} size="40" round="50%" /></div>
            <div className=' md:hidden block cursor-pointe'><Avatar name={user ? user.name : ''} size="35" round="50%" /></div>
          </>}
        </div>
      </nav>

      {mobileSearch &&
        <div className=' px-3 bg-[#F4F4F4] py-[4.5px]'>
          <div className=' w-full border flex items-center bg-white rounded-lg'>
            <img src='./search.svg' alt='' className=' mx-0.5 w-5 h-5' />
            <input onChange={(e) => { setsearch(e.target.value) }} value={search} type='text' placeholder='Search..' className=' w-[75vw] px-1 outline-none border-none text-[14px] py-1.5 ' />
          </div>
        </div>
      }

    </header>

  )
}

export default Navbar