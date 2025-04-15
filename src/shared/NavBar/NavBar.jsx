
import { Link } from "react-router-dom"
import NavBarToggle from "./NavBarToggle";

const NavBar = () => {

    return (
        <div>
            <div className="z-20 flex items-center justify-between py-[1rem] px-[2rem] w-[100vw]">
                <div>
                    <NavBarToggle />
                </div>

                <div>
                    <Link to={'/'}>
                        <img src="/img/logo.png" alt="" className="w-[8rem] cursor-pointer" />
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default NavBar