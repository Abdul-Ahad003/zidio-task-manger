import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const Docs = ({ docs }) => {

  const navigate = useNavigate();

  const [error, setError] = useState('')
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);

  const docID = `doc-${docs._id}`;

  const deleteDoc = async (id) => {

    let a = await fetch('http://localhost:3000' + '/deleteDoc', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        docsId: id,
        userId: localStorage.getItem('userId')
      }),
    })
    let data = await a.json()

    if (data.success == true) {
      toast.success('Deleted Successfully')
    }
    else {
      setError(data.message)
    }
  }


  return (
    <>
      <div id={docID} className='docs cursor-pointer rounded-lg flex items-center mt-2.5 justify-between md:p-[10px] px-[5.5px] py-1.5 bg-[#F0F0F0] transition-all hover:bg-[#DCDCDC]'>
        <div onClick={() => { navigate(`/createDocs/${docs._id}`)} } className="flex items-center gap-2 md:w-full">
          <img src='./images/google-docs.png' alt='' className=' md:w-12 md:h-12 w-10 h-10' />
          <div>
            <p className='md:text-[20px] text-[17px] font-Averia '>{docs.title}</p>
            <p className='md:text-[14px] text-[10px] text-[#808080]'>
              Created On : {new Date(docs.date).toDateString()} | Last Updated : {new Date(docs.lastUpdate).toDateString()}
            </p>
          </div>
        </div>
        <div className="docsRight">
          <div onClick={() => { setIsDeleteModelShow(true) }} className="cursor-pointer transition-all"><img className=' md:w-8 md:h-8 w-6 h-6' src='./delete.svg' alt=''/></div>
        </div>
      </div>

      {isDeleteModelShow && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col justify-center md:p-5 p-3.5 bg-[#fff] rounded-lg xl:w-[36vw] lg:w-[45vw] w-[80vw]">
            <h3 className='text-[20px] font-Averia font-semibold'>Delete Document</h3>
            <div className="flex items-center gap-3 my-3">
              <img src='./images/deletedoc.png' alt="" className=' w-16 h-16' />
              <div>
                <h3 className='text-[18px] '>Do You Want to delete this document ?</h3>
              </div>
            </div>
            <div className="flex mt-2 items-center gap-2 justify-between w-full">
              <button onClick={() => { deleteDoc(docs._id, docID); setIsDeleteModelShow(false) }} className=' w-1/2 md:py-2 py-1.5 bg-[#cf0909] transition-all hover:bg-[#ff2222] text-white rounded-lg border-0 cursor-pointer font-abee md:text-[16px] text-[12.5px]'>Delete</button>
              <button onClick={() => { setIsDeleteModelShow(false) }} className=' w-1/2 md:py-2 py-1.5 bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer font-abee md:text-[16px] text-[12.5px]'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Docs