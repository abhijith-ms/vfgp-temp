"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import icon from "../../public/logo.png"
import Link from 'next/link'

export default function NavBar() {

    const [open, setOpen] = useState(false)

    return (
        <nav className='flex justify-between items-center px-3 sm:px-6 lg:px-12 py-4 relative'>

            <div className='flex gap-2 items-center'>
                <Image src={icon} alt="logo" className='w-[36px] h-[35px] sm:w-[42px] sm:h-[41px]' />
                
                <h1 className='text-[12px] sm:text-[16px] md:text-[18px] leading-tight font-extrabold uppercase text-[#282967]'>
                    Venkateshwara <br /> Fibreglass Products
                </h1>
            </div>

            <ul className='hidden md:flex gap-6 lg:gap-10 items-center text-[#282967] font-semibold text-sm lg:text-base'>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/">About Us</Link></li>
                <li><Link href="/">Products</Link></li>
                <li><Link href="/">Facilities</Link></li>
                <li><Link href="/">Contact</Link></li>
            </ul>

            <div className='hidden lg:flex bg-[#282967] rounded-md text-white px-4 py-2 text-sm lg:text-base'>
                <button>Get a Quote</button>
            </div>

            <div className='md:hidden'>
                <button onClick={() => setOpen(!open)} className='text-2xl'>
                    ☰
                </button>
            </div>

            {open && (
                <div className='absolute top-full left-0 w-full bg-white shadow-md md:hidden'>
                    <ul className='flex flex-col items-center gap-4 py-4 text-[#282967] font-semibold'>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/">About Us</Link></li>
                        <li><Link href="/">Products</Link></li>
                        <li><Link href="/">Facilities</Link></li>
                        <li><Link href="/">Contact</Link></li>
                        <li>
                            <button className='bg-[#282967] text-white px-4 py-2 rounded'>
                                Get a Quote
                            </button>
                        </li>
                    </ul>
                </div>
            )}

        </nav>
    )
}