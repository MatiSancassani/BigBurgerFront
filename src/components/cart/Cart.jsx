import { useState } from "react";
import { useCart } from "../context/NewContext";
import { IoMdClose } from "react-icons/io";
import { HiOutlineTrash } from "react-icons/hi";

function Cart() {
    const { cart, getCart, user } = useCart();
    const cart_id = user?.cart_id;
    const [toggleCart, setToggleCart] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    // console.log(paymentMethod)
    const [deliveryMethod, setDeliveryMethod] = useState(null);
    // console.log(deliveryMethod)


    const handlePaymentSelection = (method) => {
        setPaymentMethod(method);
    };
    const handleDeliverySelection = (method) => {
        setDeliveryMethod(method);
    };

    const handleClick = () => setToggleCart(!toggleCart);

    // 🔥 Calcular el total del carrito sumando productos y adicionales
    const totalCartPrice = cart.reduce((total, item) => {
        const additionalsTotal = item.additionals.reduce(
            (acc, additional) => acc + additional.price * additional.quantity,
            0
        );
        return total + item.id.price * item.quantity + additionalsTotal;
    }, 0);

    const deleteAllProducts = async () => {
        await fetch(`https://bigburgerbackend.onrender.com/api/carts/${cart_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        getCart(user.cart_id); // Actualizar el carrito después de eliminar los productos
    };

    const deleteProduct = async (id) => {
        await fetch(`https://bigburgerbackend.onrender.com/api/carts/${cart_id}/product/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        getCart(user.cart_id); // Actualizar el carrito después de eliminar el producto
    };


    const generateWhatsAppMessage = () => {
        let message = "_¡Hola! Te paso el resumen de mi pedido_\n\n";

        cart.forEach((item) => {
            let burgerTotal = item.id.price * item.quantity;
            let comboAdditionals = [];
            let otherAdditionals = {}; // Usamos un objeto para agrupar por categoría

            item.additionals.forEach((additional) => {
                if (additional.category === "Combo") {
                    burgerTotal += additional.price * additional.quantity;
                    comboAdditionals.push(additional);
                } else {
                    if (!otherAdditionals[additional.category]) {
                        otherAdditionals[additional.category] = [];
                    }
                    otherAdditionals[additional.category].push(additional);
                }
            });

            message += `*Burger*\n`;
            message += `x${item.quantity} ${item.id.title}`;

            if (comboAdditionals.length > 0) {
                message += ` (${comboAdditionals.map(a => a.title).join(", ")})`;
            }

            message += ` - $${burgerTotal}\n`;

            for (const category in otherAdditionals) {
                message += `*${category}*\n`;
                otherAdditionals[category].forEach((additional) => {
                    message += `x${additional.quantity} ${additional.title} - $${additional.price * additional.quantity}\n`;
                });
            }
            message += "\n"; // Salto de línea después de la sección de cada burger
        });

        message += `*Total del Carrito:* *$${totalCartPrice}*`;
        message += `\n\n*Metodo de pago:* *${paymentMethod}*\n*Metodo de entrega:* *${deliveryMethod}*`;
        message += "\n\n_Espero tu respuesta para confirmar mi pedido_";

        return encodeURIComponent(message);
    };

    return cart.length > 0 ? (
        <div className="">
            {/* Botón para abrir el carrito */}
            <div className="fixed top-[38rem] right-0 lg:top-[42rem] lg:fixed">
                <button onClick={handleClick} className="inline-block relative cursor-pointer">
                    <small className="absolute font-bold bottom-[5px] left-[13px] text-black rounded-[30%] lg:bottom-[12px] lg:left-[21px] lg:text-[1.5rem] lg:rounded-[10%_/_50%]">
                        {cart.length}
                    </small>
                    <img className="w-[3rem] h-[3rem] lg:w-[5rem] lg:h-[5rem]" src="/img/cartBurger/orderBurger.png" alt="" />
                </button>
            </div>

            {/* Carrito desplegable */}
            <div className={`fixed top-0 lg:p-[1rem] h-full  z-[999] text-white bg-black w-screen lg:w-[35%] overflow-y-scroll scrollbar-hide transition-all duration-300 ${toggleCart ? "right-0" : "-right-full"}`}>
                <div className="flex items-center justify-center m-[1.5rem]">
                    <h2 className="text-center text-gray-300 font-bold text-2xl tracking-[2px] uppercase">My Order</h2>
                </div>

                <div>
                    <ul>
                        {cart.map((item, index) => {
                            // 🔥 Calcular total por cada item incluyendo sus adicionales
                            const additionalsTotal = item.additionals.reduce(
                                (acc, additional) => acc + additional.price * additional.quantity,
                                0
                            );
                            const itemTotal = item.id.price * item.quantity + additionalsTotal;

                            return (
                                <li className="m-[1rem]" key={`${item.id._id}-${index}`}>
                                    <div className="flex items-center justify-center gap-2 border-b-[1px] border-gray-400">
                                        <div className="flex items-center justify-center">
                                            <img className="w-[3rem]" src={item.id.thumbnail} alt={item.id.title} />
                                        </div>
                                        <div className="w-full">
                                            {/* Información del producto */}
                                            <div className="flex items-center justify-between">
                                                <p className="font-bold">Burger {item.id.title}</p>
                                                <p>$ {item.id.price * item.quantity}</p>
                                            </div>

                                            {/* Lista de adicionales */}
                                            {item.additionals.length > 0 && (
                                                <ul className="mt-1">
                                                    {item.additionals.map((additional, index) => (
                                                        <li key={`${additional.title}-${index}`}>
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-neutral-600 text-[12px]">
                                                                    {additional.quantity}x {additional.title}
                                                                </p>
                                                                <p>$ {additional.price * additional.quantity}</p>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* 🔥 Total de cada item con adicionales */}
                                            <div className="flex items-center mt-2 mb-4 gap-2">
                                                <p>Total:</p>
                                                <p>$ {itemTotal}</p>
                                                <HiOutlineTrash className="text-red-600 cursor-pointer"
                                                    onClick={() => deleteProduct(item.productInCartId)} />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>




                <div className="m-[1rem]">

                    <div className="flex flex-col gap-4 mb-[2rem]">
                        <p>Seleccionar método de pago:</p>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                className={`px-4 py-2 border rounded-lg ${paymentMethod === "Efectivo" ? "bg-[#5ea444de] text-white border-[#5ea444de]" : "bg-black"}`}
                                onClick={() => handlePaymentSelection("Efectivo")}
                            >
                                Efectivo
                            </button>
                            <button
                                className={`px-4 py-2 border rounded-lg ${paymentMethod === "Transferencia" ? "bg-[#009fe3b2] text-white border-[#009fe3b2]" : "bg-black"}`}
                                onClick={() => handlePaymentSelection("Transferencia")}
                            >
                                Transferencia
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-[2rem]">
                        <p>Seleccionar forma de entrega:</p>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                className={`px-4 py-2 border rounded-lg ${deliveryMethod === "Delivery" ? "bg-[#f70050] text-white border-[#f70050]" : "bg-black"}`}
                                onClick={() => handleDeliverySelection("Delivery")}
                            >
                                Delivery
                            </button>
                            <button
                                className={`px-4 py-2 border rounded-lg ${deliveryMethod === "Lo retiro personalmente" ? "bg-[#57248d] text-white border-[#57248d]" : "bg-black"}`}
                                onClick={() => handleDeliverySelection("Lo retiro personalmente")}
                            >
                                Lo retiro
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center mb-4">
                    <button className="flex items-center gap-2 justify-center border-2 border-green-600 p-2 rounded-[10px]">
                        <a href={`https://api.whatsapp.com/send?phone=5492645800162&text=${generateWhatsAppMessage()}`} target="_blank">
                            Enviar pedido por whatsapp
                        </a>
                        <p>$ {totalCartPrice}</p>
                    </button>
                </div>
                <div className="flex items-center justify-center">
                    <button onClick={deleteAllProducts} className="border-2 border-red-600 p-2 rounded-[10px]">
                        Vaciar Carrito
                    </button>
                </div>

                <button onClick={() => setToggleCart(false)}>
                    <IoMdClose className="absolute top-[1rem] right-[1rem] text-3xl text-white" />
                </button>
            </div>
        </div>
    ) : null;
}

export default Cart;