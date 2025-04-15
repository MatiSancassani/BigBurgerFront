import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
// import BurgersModal from '../shared/Modal';
import { useParams } from 'react-router-dom';
import NavBar from '../shared/NavBar/NavBar';
// import Cart from './cart/Cart';
const BurguerDetail = () => {
    const { id } = useParams();
    const [productos, setProductos] = useState({});
    localStorage.setItem('ProductID', (id))

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await fetch(`https://bigburgerbackend-1.onrender.com/api/products/${id}`);
                const data = await response.json();
                setProductos(data.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (id) {
            getProductById();
        }
    }, [id]); // <- Se ejecutará solo cuando `id` cambie
    const { thumbnail, title, description, price } = productos


    return (
        <div className=''>
            <div className="hidden text-white lg:flex lg:items-center lg:justify-between z-10">
                <NavBar />
            </div>

            <div>
                <div className="h-[3.5rem] bg-black w-screen flex items-center justify-start text-[1rem] text-white lg:hidden">
                    <Link to="/menu">
                        <div className='flex items-center justify-center gap-1 p-2'>
                            <IoIosArrowBack />
                            <p className='font-bold'>Menu</p>
                        </div>
                    </Link>
                    <div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-[2rem]">
                <div className="">
                    <h2 className="text-center text-[1.5rem] font-bold">{title}</h2>
                    <div className="text-white mt-[2rem]">
                        <img className='w-[20rem] lg:w-[25rem]' src={`${thumbnail}`} alt={title} />
                    </div>
                </div>

                <div className="">
                    <div className="text-white flex flex-col items-center gap-2">

                        <p className='text-left font-bold'>{'$' + ' ' + price}</p>
                        <p className="">{description}</p>
                    </div>
                </div>

                <div className='mt-[3rem]'>
                    {/* <BurgersModal /> */}
                </div>
            </div>

            {/* <Cart /> */}

        </div>

    )
}

export default BurguerDetail