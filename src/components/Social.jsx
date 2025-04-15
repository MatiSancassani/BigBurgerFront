import { FaTiktok, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Social = () => {
    return (
        <div className="hidden lg:flex">
            <div className='fixed bottom-0 mb-[8rem] right-[2rem] flex flex-col gap-[1rem] text-[1.5rem] text-white transition-[1s] '>
                <div className="h-[3rem] w-[3rem] flex items-center justify-center rounded-[50%] cursor-pointer bg-black hover:bg-[#333] hover:text-[1.3rem] transition-[1s]">
                    <FaFacebookF />
                </div>
                <div className="h-[3rem] w-[3rem] flex items-center justify-center rounded-[50%] cursor-pointer bg-black hover:bg-[#333] hover:text-[1.3rem] transition-[1s]">
                    <FaInstagram />
                </div>
                <div className="h-[3rem] w-[3rem] flex items-center justify-center rounded-[50%] cursor-pointer bg-black hover:bg-[#333] hover:text-[1.3rem] transition-[1s]">
                    <FaTwitter />
                </div>
                <div className="h-[3rem] w-[3rem] flex items-center justify-center rounded-[50%] cursor-pointer bg-black hover:bg-[#333] hover:text-[1.3rem] transition-[1s]">
                    <FaTiktok />
                </div>
            </div>
        </div>
    )
}

export default Social