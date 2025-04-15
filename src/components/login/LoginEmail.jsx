import React from 'react'
import { Link, Links } from 'react-router-dom'

const LoginEmail = () => {
    return (
        <div className='flex items-center justify-center'>

            <div className='hidden lg:h-screen lg:w-[50vw] lg:flex lg:items-center lg:justify-center'>
                <div className=''>
                    <img src="img/login.png" alt="" />
                </div>
            </div>

            <div className='mt-[10rem] flex items-center justify-center lg:mt-0'>
                <div className=' text-white flex items-center flex-col justify-center lg:h-screen lg:w-[50vw] lg:items-start lg:pl-[3rem]'>
                    <div>
                        <h1 className='w-[22rem] lg:w-96 max-w-xl text-[29px] font-bold md:max-w-[34rem] lg:text-5xl mb-[2rem]'>Inicia sesión o regístrate</h1>
                    </div>
                    <div>
                        <h3 className='text-lg font-bold mb-[2rem] text-center m-[.5rem] lg:hidden'>Ingresa con tu correo electrónico si ya tienes cuenta. Si no, regístrate aquí</h3>
                    </div>
                    <div className='flex flex-col gap-[2rem]'>
                        <Link to={'/signIn'}>
                            <div className='w-[20rem] cursor-pointer flex items-center justify-center p-[1rem] lg:w-[25rem] bg-black rounded border border-neutral-950 font-bold '>
                                <div className='text-[.875rem]'>
                                    Ingresar
                                </div>
                            </div>
                        </Link>
                        <Link to={'/signUp'}>
                            <div className='w-[20rem] cursor-pointer flex items-center justify-center p-[1rem] lg:w-[25rem] hover:bg-black hover:bg-opacity-50 rounded border border-neutral-400 font-bold'>
                                <div className='text-[.875rem]'>
                                    Registrarme
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginEmail