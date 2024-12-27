import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/components/Logo';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {

  const navigate = useNavigate()

  const passwordValref = useRef()
  const passwordImgref = useRef()

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {

    e.preventDefault();
    let a = await fetch('http://localhost:3000' + '/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    })
    let data = await a.json()

    if (data.success == true) {

      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userId", data.userId);
      setTimeout(() => {
        navigate('/')
        setTimeout(() => {
          toast.success('Login Successful')
        }, 70);
      }, 50);

    }
    else {
      setError(data.message)
    }
  }

  const passwordShow = () => {
    if (passwordValref.current.type === 'password') {
      passwordValref.current.type = 'text'
      passwordImgref.current.src = './eye.svg'
    }
    else {
      passwordValref.current.type = 'password'
      passwordImgref.current.src = './eye-slash.svg'
    }
  }

  return (
    <>
      <div><Toaster /></div>
      <section className='h-screen flex flex-col justify-center gap-16'>
        <div className='xl:w-[30vw]  lg:w-[60vw]  w-[75vw] mx-auto'>
          <Logo />
        </div>
        <div className=' flex justify-center items-center' >
          <form onSubmit={login} className='xl:w-[30vw] lg:w-[60vw]  w-[75vw]' action="">
            <div className='inputCon py-1'>
              <p className=' text-[14px] text-[#808080] flex items-center py-1.5'>Email</p>
              <div className="inputBox w-[100%] flex items-center py-2 border rounded-lg">
                <img src='./email.svg' alt='user' className='mx-2 h-6 w-6' />
                <input className='pr-3 pl-1.5 w-full border-none outline-none' onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' id='Email' name='Email' required />
              </div>
            </div>

            <div className='inputCon py-1'>
              <p className='text-[14px] text-[#808080] flex items-center py-1.5'>Password</p>
              <div className="inputBox w-[100%] flex items-center py-2 border rounded-lg">
                <img src='./password.svg' alt='user' className='mx-2 h-6 w-6' />
                <input className='pr-3 pl-1.5 w-full border-none outline-none' onChange={(e) => { setPwd(e.target.value) }} ref={passwordValref} value={pwd} type="password" placeholder='Password' id='Password' name='Password' required />
                <img onClick={passwordShow} ref={passwordImgref} src='./eye-slash.svg' alt='user' className='mx-2 h-6 w-6 cursor-pointer' />
              </div>
            </div>

            <p className='text-red-500 text-[14px] my-3'>{error}</p>
            <p>Don't have an account <Link to="/signUp" className='text-blue-800 font-semibold mt-1.5'>Sign Up</Link></p>

            <button type='submit' className='p-[10px] bg-[#0086f9] transition-all hover:bg-[#3597ec] text-white rounded-lg w-full border-0 mt-3.5 font-abee'>Login</button>

          </form>
        </div>
      </section>
    </>
  )
}

export default Login