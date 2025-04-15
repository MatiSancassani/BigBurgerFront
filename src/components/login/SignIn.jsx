import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from "../context/NewContext"; // Importamos el contexto

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginUser, setLoginUser] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useCart(); // Usamos el contexto
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(email, password);

        if (!response.success) {
            setErrorMessage(response.message);
            return;
        }

        navigate("/");
    };


    return (
        <>
            <div className='flex items-center justify-center'>
                <div className='hidden lg:h-screen lg:w-[50vw] lg:flex lg:items-center lg:justify-center'>
                    <div className=''>
                        <img src="img/login.png" alt="" />
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <div className=' text-white flex items-center flex-col justify-center lg:h-screen lg:w-[50vw] lg:items-start lg:pl-[3rem]'>
                        <div className=''>
                            <h1 className='mt-[6rem] lg:mt-0 text-center lg:text-left max-w-xl text-[32px] font-bold md:text-5xl'>¡Qué alegría verte de nuevo por aquí!</h1>
                        </div>
                        <div>
                            <h3 className='mt-8 mb-[2rem] text-sm md:text-lg'>Ingresa tus datos</h3>
                        </div>
                        <div className='flex flex-col gap-[3rem]'>
                            <div className="">
                                {/* DIV EMAIL */}
                                <div className=''>
                                    <form action="" className='flex flex-col gap-[2rem]'>
                                        <div className='relative'>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                onChange={(event) => { setEmail(event.target.value) }}
                                                placeholder=""
                                                className="mb-[1rem] border-b w-[20rem] border-gray-300 py-1 focus:border-b-2 focus:border-[#e99825] transition-colors focus:outline-none peer bg-inherit"
                                            />
                                            <label
                                                htmlFor="email"
                                                className="absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
                                            >
                                                E-mail
                                            </label>
                                        </div>

                                        <div className="relative">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                onChange={(event) => { setPassword(event.target.value) }}
                                                placeholder=""
                                                className="border-b w-[20rem] border-gray-300 py-1 focus:border-b-2 focus:border-[#e99825] transition-colors focus:outline-none peer bg-inherit"
                                            />
                                            <label
                                                htmlFor="password"
                                                className="absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
                                            >
                                                Password
                                            </label>
                                        </div>
                                        <div style={{ minHeight: "20px" }}> {/* Espacio reservado para el error */}
                                            {errorMessage && <p className='text-[#ce2e2e] text-[12px]'>{errorMessage}</p>}
                                        </div>
                                        <div className='flex items-center justify-center'>
                                            <button className='' type='submit' onClick={handleSubmit}>Continuar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <div>
                            <p className='mt-[2rem]'>¿No tienes una cuenta?
                                <Link to='/signUp'>
                                    <span className='text-[#e99825]'> Registrate</span>
                                </Link>
                            </p>
                            <p>¿Olvidaste tu contraseña?</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default SignIn