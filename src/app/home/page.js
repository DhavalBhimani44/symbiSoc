"use client"
import React from 'react'
import { useEffect } from 'react'

const page = () => {
    useEffect(() => {
        document.title = 'home';
    }, []);
  
  
    return (
    <div className='container mx-auto px-12'>
        <div className="box">WELCOME TO HOME PAGE!</div>
    </div>
  )
}

export default page