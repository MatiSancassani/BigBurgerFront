import PropTypes from "prop-types";
import { useState } from 'react';
import Modal2 from '../../shared/Modal2';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


const CardBurger = ({ title, thumbnail, id, price, description }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className="">

            <div className="flex">
                <button onClick={handleClick} className="hidden lg:flex lg:w-[15rem] lg:flex-col lg:items-center lg:rounded-xl lg:text-white lg:mb-[1rem] lg:gap-2">
                    <img className="w-[5rem] lg:w-[10rem] lg:hover:translate-y-[-5px] lg:transition-transform lg:duration-[0.3s] lg:ease-in-out" src={`${thumbnail}`} alt={title} />
                    <h5 className="text-[1.5rem] font-sans lg:text-xl text-center">{title}</h5>
                    <p>{description}</p>
                    <p>Desde {price}</p>
                </button>
            </div>

            <button onClick={handleClick} className="lg:hidden bg-black bg-opacity-50 rounded flex w-screen items-center justify-between  text-white mb-[1rem] gap-2 p-4">
                <div>
                    <img className="w-[5rem]" src={`${thumbnail}`} alt={title} />
                </div>

                <div className="flex items-center">
                    <div className="text-center">
                        <h5 className="text-[1.3rem] font-sans font-bold text-center">{title}</h5>
                        <p className="font-thin">{description}</p>
                        <p className="font-thin">Desde {price}</p>
                    </div>
                </div>

                <MdOutlineKeyboardArrowRight className="text-[2rem]" />
            </button>

            <Modal2 className="" title={title} thumbnail={thumbnail} id={id} price={price} isOpen={isOpen} closeModal={() => setIsOpen(false)} />
        </div>
    )
}
CardBurger.propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
};
export default CardBurger
