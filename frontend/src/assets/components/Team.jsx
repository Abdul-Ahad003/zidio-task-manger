import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'


const Team = () => {

    const [fullName, setfullName] = useState('')
    const [role, setrole] = useState('')
    const [allMembers, setallMembers] = useState('')
    const [ShowModal, setShowModal] = useState(false)

    
    const addMember = () => { 
        setShowModal(false)
        setallMembers([...allMembers,{fullName,role,id:uuidv4()}])
    }
    
    return (
        <>
            <div className=' bg-[#F4F4F4] flex items-center sticky top-0  md:py-2.5 md:px-12  py-1.5 px-3 justify-between'>
                <Link to='/'>
                    <div className=' flex items-center gap-2.5'>
                        <img src='../images/docs.png' alt='logo' className=' md:w-12 md:h-12 w-10 h-10' />
                        <span className=' md:text-[24px] text-[21px] font-Matemasie '>Task Manager</span>
                    </div>
                </Link>
            </div>
            <section className=' px-12'>
                <div className=' pt-2 pb-2.5'>
                    <div className=' flex justify-between items-center '>
                        <div className=' flex gap-6 items-center'>
                            <img src='./team.svg' className=' w-16 h-16' />
                            <div className=' font-Averia text-[22px]'>My Team</div>
                        </div>

                        <button onClick={() => { setShowModal(!ShowModal) }} className=' flex items-center gap-2 bg-[#0086f9] text-white py-2 px-2 rounded-xl'>
                            <img src='./add.svg' className=' w-8 h-8' />
                            <span className=' font-semibold'>Add Member</span>
                        </button>
                    </div>



                    {
                        allMembers.length !== 0 ? allMembers.map((element, index) => {
                            return (
                                <div key={element.id}>
                                    <div >
                                        <div className='docs cursor-pointer rounded-lg flex items-center mt-2.5 justify-between md:p-[10px] px-[5.5px] py-1.5 bg-[#F0F0F0] transition-all hover:bg-[#DCDCDC]'>
                                            <div className="flex items-center gap-2 md:w-full">
                                                <div>
                                                    <p className='md:text-[20px] text-[17px] font-Averia '>{element.fullName}</p>
                                                    <p className='md:text-[14px] text-[10px] text-[#808080]'>
                                                        Id : {element.id} | Role : <span className=' text-white font-semibold rounded-[4px] px-1 py-0.5 bg-[#ff3a65]'>{element.role}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="docsRight">
                                                <div onClick={() => { setIsDeleteModelShow(true) }} className="cursor-pointer transition-all"><img className=' md:w-8 md:h-8 w-6 h-6' src='./delete.svg' alt='' /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : ""
                    }

                </div>

                {ShowModal == true && <div className="createDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center">
                    <div className="createDocsModel py-3 px-3 bg-[#fff] rounded-lg xl:w-[36vw] lg:w-[45vw] w-[80vw] ">
                        <h3 className='text-[20px] font-Averia font-semibold'>Add Member</h3>
                        <div className=' mt-3 py-2'>
                            <p className=' text-[14px] text-[#808080]'>Full Name</p>
                            <div className=' flex items-center justify-between border rounded-xl my-2 bg-[#D1D5DB]'>
                                <img src='./user.svg' alt='' className=' mx-1 w-6 h-6' />
                                <input onChange={(e) => { setfullName(e.target.value) }} className=' w-full outline-none py-2 bg-[#D1D5DB] px-1.5' value={fullName} type="text" placeholder='Enter full name' id='fullname' name='fullname' required />
                            </div>
                        </div>
                        <div className=' py-2'>
                            <p className=' text-[14px] text-[#808080]'>Role</p>

                            <div className=' flex items-center justify-between border rounded-xl my-2 bg-[#D1D5DB]'>
                            <img src='./role.svg' alt='' className=' mx-1  w-6 h-6' />
                                <input onChange={(e) => { setrole(e.target.value) }} className=' w-full outline-none py-2 bg-[#D1D5DB] px-1.5' value={role} type="text" placeholder='Enter role' id='role' name='role' required />
                            </div>
                        </div>

                        <div className="flex  items-center justify-between md:gap-4 gap-[3vw] w-full">
                            <button onClick={addMember} className='bg-[#0086f9] text-white w-1/2 flex items-center md:gap-1 gap-0.5 md:py-2 py-1.5  rounded-lg'><span><img src='./add.svg' alt='' className=' md:mx-1.5 md:w-6 md:h-6 mx-0.5 w-5 h-5' /></span> <span className='md:text-[16px] text-[12.5px]  w-1/2 font-abee'>Add</span></button>
                            <button onClick={() => { setShowModal(false) }} className=' md:py-2 py-1.5 bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer w-1/2 '><span className=' md:text-[16px] text-[12.5px] font-abee'>Cancel</span></button>
                        </div>
                    </div>
                </div>}
            </section>
        </>
    )
}

export default Team