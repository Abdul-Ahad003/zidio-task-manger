import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Deadline = () => {

    const [date, setdate] = useState('')
    const [time, settime] = useState('')
    const [ShowModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('')

    const [alldeadlines, setalldeadlines] = useState([])

    const handleDeadline = () => {
        setShowModal(!ShowModal)
    }

    const adddeadline = () => {
        setShowModal(false)
        setalldeadlines([...alldeadlines, { title, date, time }])
    }


    if ("Notification" in window && Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            setInterval(() => {
                alldeadlines.forEach(element => {
                    const now = new Date
                    const fulldate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
                    let time24hr = now.toLocaleTimeString('en-US', { hour12: false }).split(':').slice(0, 2)
                    time24hr = time24hr.join(':')
                    if (element.date == fulldate && element.time == time24hr) {
                        new Notification("Current Time", { body: `Deadline for ${element.title} has ended`  });
                    }
                });
            }, 60000); 
          }
        });
      } else {
        console.log("Notifications not supported or permission denied.");
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
            <section className=' px-10'>
                <div className=' flex justify-around items-center mt-5'>
                    <img src='./deadline.svg' className=' w-16 h-16' />
                    <div>
                        <button onClick={handleDeadline} className=' flex items-center gap-2 bg-[#0086f9] text-white py-2 px-1.5 rounded-xl'>
                            <img src='./timer.svg' className=' w-8 h-8' />
                            <span className=' font-semibold'>Set Deadline</span>
                        </button>
                    </div>
                </div>

                <div className=' pt-3 pb-1.5'>
                    <div className=' font-Averia text-[22px]'>All deadline</div>

                    {
                        alldeadlines.length !== 0 ? alldeadlines.map((element, index) => {
                            return (
                                <div key={index}>
                                    <div >
                                        <div className='docs cursor-pointer rounded-lg flex items-center mt-2.5 justify-between md:p-[10px] px-[5.5px] py-1.5 bg-[#F0F0F0] transition-all hover:bg-[#DCDCDC]'>
                                            <div className="flex items-center gap-2 md:w-full">
                                                <div>
                                                    <p className='md:text-[20px] text-[17px] font-Averia '>{element.title}</p>
                                                    <p className='md:text-[14px] text-[10px] text-[#808080]'>
                                                        Date : {element.date} | Time : {element.time}
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
                        <h3 className='text-[20px] font-Averia font-semibold'>Add New Deadline</h3>
                        <div className=' mt-3 py-2'>
                            <p className=' text-[14px] text-[#808080]'>Title</p>
                            <div className=' flex items-center justify-between border rounded-xl my-2 bg-[#D1D5DB]'>
                                <img src='./title.svg' alt='' className=' mx-1 w-6 h-6' />
                                <input onChange={(e) => { setTitle(e.target.value) }} className=' w-full outline-none py-2 bg-[#D1D5DB] px-1.5' value={title} type="text" placeholder='Enter Project Title' id='title' name='title' required />
                            </div>
                        </div>
                        <div className=' py-2'>
                            <p className=' text-[14px] text-[#808080]'>Date & Time</p>
                            <div className=' px-6 flex items-center justify-between border rounded-xl my-2 py-1 bg-[#D1D5DB]'>
                                <input className=' outline-none border-none' type='date' value={date} onChange={(e) => { setdate(e.target.value) }} />
                                <input className=' outline-none border-none' type='time' value={time} onChange={(e) => { settime(e.target.value) }} />
                            </div>
                        </div>

                        <div className="flex  items-center justify-between md:gap-4 gap-[3vw] w-full">
                            <button onClick={adddeadline} className='bg-[#0086f9] text-white w-1/2 flex items-center md:gap-1 gap-0.5 md:py-2 py-1.5  rounded-lg'><span><img src='./add.svg' alt='' className=' md:mx-1.5 md:w-6 md:h-6 mx-0.5 w-5 h-5' /></span> <span className='md:text-[16px] text-[12.5px]  w-1/2 font-abee'>Set</span></button>
                            <button onClick={() => { setShowModal(false) }} className=' md:py-2 py-1.5 bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer w-1/2 '><span className=' md:text-[16px] text-[12.5px] font-abee'>Cancel</span></button>
                        </div>
                    </div>
                </div>}
            </section>
        </>
    )
}

export default Deadline