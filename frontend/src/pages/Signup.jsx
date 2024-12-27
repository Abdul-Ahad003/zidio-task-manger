import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/components/Logo';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {

  const navigate = useNavigate();

  const passwordValref = useRef()
  const passwordImgref = useRef()

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const createUser = async (e) => {

    e.preventDefault();
    let a = await fetch('http://localhost:3000' + '/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        password: pwd,
      }),
    })
    let data = await a.json()

    if (data.success == false) {
      setError(data.message)
    }
    else {
      setTimeout(() => {
        navigate("/login")
        setTimeout(() => {
          toast.success('Sign Up Successful')
        }, 70);
      }, 50);
    }

  }

  const passwordShow = () => {
    if (passwordValref.current.type === 'password') {
      passwordValref.current.type = 'text'
      passwordImgref.current.src = './eye.svg'
    } 
    else{
      passwordValref.current.type = 'password'
      passwordImgref.current.src = './eye-slash.svg'
    }
  }

  return (
    <>
      <section className=' h-screen flex flex-col justify-center gap-16'>
        <div className='xl:w-[30vw]  lg:w-[60vw]  w-[75vw] mx-auto'>
          <Logo />
        </div>

        <div className=' flex justify-center items-center' >
          <form onSubmit={createUser} className='xl:w-[30vw] lg:w-[60vw]  w-[75vw]' action="">
            <div className='inputCon'>
              <p className=' text-[14px] text-[#808080] flex items-center py-1.5'>Username</p>
              <div className="inputBox w-[100%] flex items-center py-2 border rounded-lg">
                <img src='./user.svg' alt='user' className='mx-2 h-6 w-6' />
                <input className='pr-3 pl-1.5 w-full border-none outline-none' onChange={(e) => { setUsername(e.target.value) }} value={username} type="text" placeholder='Username' id='username' name='username' required />
              </div>
            </div>

            <div className='inputCon'>
              <p className=' text-[14px] text-[#808080] py-1.5'>Name</p>
              <div className="inputBox w-[100%] flex items-center py-2 border rounded-lg">
                <img src='./name.svg' alt='user' className=' mx-2 h-6 w-6' />
                <input className=' pr-3 pl-1.5 w-full border-none outline-none' onChange={(e) => { setName(e.target.value) }} value={name} type="text" placeholder='Name' id='Name' name='Name' required />
              </div>
            </div>

            <div className='inputCon'>
              <p className=' text-[14px] text-[#808080] py-1.5'>Email</p>
              <div className="inputBox w-[100%] flex items-center py-2 border rounded-lg">
                <img src='./email.svg' alt='user' className='mx-2 h-6 w-6' />
                <input className='pr-3 pl-1.5 w-full border-none outline-none' onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' id='Email' name='Email' required />
              </div>
            </div>

            <div className='inputCon'>
              <p className=' text-[14px] text-[#808080] py-1.5'>Password</p>
              <div className="inputBox w-[100%] flex items-center py-2 border rounded-lg">
                <img src='./password.svg' alt='user' className='mx-2 h-6 w-6' />
                <input className='pr-3 pl-1.5 w-full border-none outline-none' onChange={(e) => { setPwd(e.target.value) }} ref={passwordValref} value={pwd} type="password" placeholder='Password' id='Password' name='Password' required />
                <img onClick={passwordShow} ref={passwordImgref} src='./eye-slash.svg' alt='user' className='mx-2 h-6 w-6' />
              </div>
            </div>

            <p className='text-red-500 text-[14px] my-3'>{error}</p>
            <p>Already have an account <Link to="/login" className='text-blue-800 font-semibold mt-1.5'>Login</Link></p>

            <button type='submit' className='p-[10px] bg-[#0086f9] transition-all hover:bg-[#3597ec] text-white rounded-lg w-full border-0 mt-3.5 font-abee'>Sign Up</button>

          </form>
        </div>
      </section>
    </>
  )
}

export default Signup