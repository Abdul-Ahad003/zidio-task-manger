import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import JoditEditor from "jodit-react";
import { Link } from 'react-router-dom';
import Logo from '../assets/components/Logo';



const Createdocs = () => {

  let { docsId } = useParams();
  const editor = useRef(null);

  const [content, setContent] = useState('');
  const [error, setError] = useState('')


  const updateDoc = async () => {

    let a = await fetch('http://localhost:3000' + '/uploadDoc', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        docsId: docsId,
        content: content
      }),
    })
    let data = await a.json()

    if (data.success == false) {
      setError(data.message)
    }
    else {

    }

  }

  const fetchDoc = async () => {
    let a = await fetch('http://localhost:3000' + '/fetchDoc', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        docsId: docsId
      }),
    })
    let data = await a.json()

    if (data.success == false) {
      setError(data.message)
    }
    else {
      setContent(data.doc.content)
    }
  }



  useEffect(() => {
    fetchDoc()
  }, [])

  return (
    <>
      <div className=' bg-[#F4F4F4] flex items-center  md:py-2.5 md:px-12  py-1.5 px-3 justify-between'>
        <Link to='/'>
          <Logo />
        </Link>
      </div>
      <div className=' h-screen w-auto '>
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1}
          onChange={e => { setContent(e); updateDoc() }}
        />
      </div>
    </>
  )
}

export default Createdocs