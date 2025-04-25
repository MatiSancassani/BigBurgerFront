import NavBarToggle from "./NavBarToggle"
import { IoIosArrowBack } from "react-icons/io";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom"

const NavBarForMenuComp = () => {
    return (
        <div className="fixed lg:fixed top-0 z-30 w-screen">
            <div className="bg-black text-white flex items-center justify-between z-10">

                <div className="lg:w-full flex items-center justify-between lg:px-[1.5rem]">
                    <div className="hidden lg:block">
                        <NavBarToggle />
                    </div>

                    <div className="h-[4rem] overflow-x-auto whitespace-nowrap scrollbar-hide w-screen flex items-center lg:justify-center ">
                        <div className="lg:hidden sticky left-0 bg-black z-10 p-4">
                            <Link to="/"><IoIosArrowBack /></Link>
                        </div>
                        <ul className="text-[15px] flex items-center justify-between lg:justify-center gap-7">
                            <ScrollLink to="classic" spy={true} smooth={true} offset={-60} duration={500}>
                                <li className="cursor-pointer border-b-[3px] border-transparent hover:border-white">CLASSICS</li>
                            </ScrollLink>
                            <ScrollLink to="bbq" spy={true} smooth={true} offset={-60} duration={500}>
                                <li className="cursor-pointer border-b-[3px] border-transparent hover:border-white">BBQ</li>
                            </ScrollLink>
                            <ScrollLink to="bacon" spy={true} smooth={true} offset={-60} duration={500}>
                                <li className="cursor-pointer border-b-[3px] border-transparent hover:border-white">BACON</li>
                            </ScrollLink>
                            <ScrollLink to="chicken" spy={true} smooth={true} offset={-60} duration={500}>
                                <li className="cursor-pointer border-b-[3px] border-transparent hover:border-white">CHICKEN</li>
                            </ScrollLink>
                            <ScrollLink to="vegan" spy={true} smooth={true} offset={-60} duration={500}>
                                <li className="pr-4 cursor-pointer border-b-[3px] border-transparent hover:border-white">VEGAN</li>
                            </ScrollLink>
                        </ul>
                    </div>

                    <div className="hidden lg:block">
                        <Link to={'/'}>
                            <img src="/img/logo.png" alt="" className="w-[8rem] cursor-pointer" />
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NavBarForMenuComp