import { IoMdClose } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import ButtonAdmin from "../../admin/ButtonAdmin";
import { useCart } from "../../components/context/NewContext";
const NavBarToggle = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useCart();
    const buttonSigOut = () => {
        logout();
        navigate("/login");
    }

    const toggleMenu = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    return (
        <>
            <div className="">
                <button onClick={toggleMenu}>
                    <div className="bg-white p-[.5rem] rounded-[30%]">
                        <div className="w-[1.5rem] h-[1.5rem] text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 512 512">
                                <path d="M464 256H48a48 48 0 0 0 0 96h416a48 48 0 0 0 0-96zm16 128H32a16 16 0 0 0-16 16v16a64 64 0 0 0 64 64h352a64 64 0 0 0 64-64v-16a16 16 0 0 0-16-16zM58.64 224h394.72c34.57 0 54.62-43.9 34.82-75.88C448 83.2 359.55 32.1 256 32c-103.54.1-192 51.2-232.18 116.11C4 180.09 24.07 224 58.64 224zM384 112a16 16 0 1 1-16 16 16 16 0 0 1 16-16zM256 80a16 16 0 1 1-16 16 16 16 0 0 1 16-16zm-128 32a16 16 0 1 1-16 16 16 16 0 0 1 16-16z">
                                </path>
                            </svg>
                        </div>
                    </div>
                </button>
            </div>


            <div className={`fixed top-0 bottom-0 p-8 z-30 text-white bg-black w-screen lg:w-80 overflow-y-scroll scrollbar-hide transition-all duration-300 ${isNavbarOpen ? "left-0" : "-left-full"}`}>

                <div className="flex flex-col justify-between h-full">

                    <div className="">
                        <div className="flex items-center justify-between p-[1rem] mb-10">
                            <div>
                                <h2 className="text-gray-300 font-bold text-2xl tracking-[2px] uppercase">BigBurger</h2>
                            </div>
                            <button onClick={toggleMenu}>
                                <div className="border-transparent border-gray-300 rounded-[100%] cursor-pointer hover:bg-[#333] text-[1.5rem]">
                                    <IoMdClose />
                                </div>
                            </button>
                        </div>
                        <ul className="">
                            <li>
                                <Link to={'/'} className="flex items-center text-gray-300 hover:bg-[#232323] py-3 px-4 rounded-xl transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to={'/menu'} className="flex items-center text-gray-300 hover:bg-[#232323] py-3 px-4 rounded-xl transition-colors">Burgers</Link>
                            </li>
                            <li><Link to={'/'} className="flex items-center text-gray-300 hover:bg-[#232323] py-3 px-4 rounded-xl transition-colors">Menu</Link></li>
                            <li>
                                {user?.rol == true ? <div className="">
                                    <ButtonAdmin />
                                </div> : null}
                            </li>
                        </ul>
                    </div>

                    <div className="">
                        <div className="cursor-pointer text-gray-300 hover:bg-[#232323] py-3 px-4 rounded-xl transition-colors" >
                            <button className="flex items-center gap-4">
                                <CiLogin />
                                {user ? <Link onClick={buttonSigOut} to={'/login'}>Sign out</Link> : <Link to={'/login'}>Sign In</Link>}
                            </button>
                        </div>
                        <div className="cursor-pointer flex items-center gap-4 text-gray-300 hover:bg-[#232323] py-3 px-4 rounded-xl transition-colors">
                            <img className="w-4 h-4 object-cover rounded-full" src="/img/user.png" alt="" />
                            <p>{user ? `${user.userName}` : 'Invitado'}</p>
                        </div>


                    </div>
                </div>


            </div>
        </>

    )
}

export default NavBarToggle