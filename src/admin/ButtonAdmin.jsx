import { Button } from "@chakra-ui/react"
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "../components/ui/menu"
import { Link } from "react-router-dom"

const ButtonAdmin = () => {
    return (
        <MenuRoot>
            <MenuTrigger asChild>
                <div className="flex items-center text-gray-300 hover:bg-[#232323] py-3 px-4 rounded-xl transition-colors cursor-pointer">
                    <Button variant="" size="sm" className="">
                        Admin
                    </Button>
                </div>
            </MenuTrigger>
            <MenuContent className="bg-[#000000]">
                <Link to={'/products'} >
                    <MenuItem value="Add New Burger" className="flex items-center text-gray-300 hover:bg-[#232323] py-3 px-4 transition-colors cursor-pointer">New Burger</MenuItem>
                </Link>

                <Link to={'/additionals'} >
                    <MenuItem value="Add New Addiotional" className="flex items-center text-gray-300 hover:bg-[#232323] py-3 px-4 transition-colors cursor-pointer">New Additional</MenuItem>
                </Link>



            </MenuContent>
        </MenuRoot>
    )
}

export default ButtonAdmin