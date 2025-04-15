import React from 'react'
import { Link as ScrollLink } from "react-scroll"

const Footer = () => {
    return (
        <div className='bg-black text-white bg-opacity-60'>
            <div className='flex items-center text-[15px] text-center p-[1rem] lg:justify-around'>
                <div className='flex items-center justify-center gap-[1rem]'>
                    <ScrollLink to={'header'} spy={true} smooth={true} offset={-50} duration={500}>
                        <img className='w-[8rem] cursor-pointer' src="/img/logo.png" alt="" />
                    </ScrollLink>
                    <p className='hidden lg:flex'>BigBurguer</p>
                </div>
                <div>
                    <div>
                        <p>Horarios de atención</p>
                        <p className='lg:text-center'>20:00 - 22:00</p>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Copyright © 2024 BigBurguer</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer