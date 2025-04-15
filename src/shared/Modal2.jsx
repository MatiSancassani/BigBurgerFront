import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useCart } from "../components/context/NewContext"; // Importar el contexto
import { ToastContainer, toast, Bounce } from 'react-toastify';

const Modal2 = ({ isOpen, closeModal, id }) => {
    const [productos, setProductos] = useState({});
    const [additionals, setAdditionals] = useState([]);
    const [selectedBurger, setSelectedBurger] = useState(null);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [selectedDrinks, setSelectedDrinks] = useState([]);
    const [count, setCount] = useState(1);
    const { getCart, cart, user } = useCart();

    const productId = id;
    const cart_id = user?.cart_id;
    const handleFeatureChange = (featureId) => {
        setSelectedFeatures((prev) =>
            prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId]
        );
    };
    const handleDrinkChange = (drinkId) => {
        setSelectedDrinks((prev) =>
            prev.includes(drinkId) ? prev.filter((id) => id !== drinkId) : [...prev, drinkId]
        );
    };

    const selectedBurgerData = additionals.find(a => a._id === selectedBurger);
    // Calcular precio total
    const totalPrice =
        productos.price * count +
        selectedFeatures.reduce((acc, id) => acc + (additionals.find((a) => a._id === id)?.price || 0), 0) +
        selectedDrinks.reduce((acc, id) => acc + (additionals.find((a) => a._id === id)?.price || 0), 0) +
        (selectedBurgerData ? selectedBurgerData.price : 0);

    const orderData = {
        additionals: [
            selectedBurger ? { id: selectedBurger, quantity: 1 } : null,
            ...selectedFeatures.map((id) => ({ id, quantity: 1 })),
            ...selectedDrinks.map((id) => ({ id, quantity: 1 })),
        ].filter(Boolean),
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cart_id || !productId) {
            console.error("Error: userCartId o productId son nulos o indefinidos.");
            return;
        }
        toast.success('Producto Agregado', {
            position: "top-center",
            autoClose: 1000,
            closeOnClick: true,
            hideProgressBar: true,
            closeButton: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            style: {
                zIndex: 99999,
                margin: '30px 0 0 0',
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo blanco translúcido
                width: '220px', // Ajusta el ancho según tus necesidades
                padding: '10px 15px', // Aumenta el padding para mayor espacio
                fontSize: '16px', // Aumenta el tamaño de la fuente
                borderRadius: '12px', // Esquinas redondeadas, similar a iOS
                color: '#000', // Color del texto negro
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Sombra sutil
                backdropFilter: 'blur(10px)',
            }
        });

        try {
            const response = await fetch(`https://bigburgerbackend-1.onrender.com/api/carts/${cart_id}/product/${productId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            const text = await response.text();
            try {
                const result = JSON.parse(text);
                if (response.ok) {
                    getCart(user.cart_id);
                    // 🔥 ACTUALIZA EL CARRITO, PERO SIN ABRIRLO
                    // closeModal(); // 🔥 CIERRA EL MODAL DESPUÉS DE AGREGAR EL PRODUCTO
                } else {
                    console.error("Error al agregar al carrito:", result);
                }
            } catch {
                console.error("La respuesta no es un JSON válido:", text);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    // LLAMADA A PRODUCTOS
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://bigburgerbackend-1.onrender.com/api/products/${productId}`);
                const data = await response.json();
                setProductos(data.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (productId) fetchProduct();
    }, [productId]);
    // LLAMADA A ADDITIONAL 

    useEffect(() => {
        const fetchAdditional = async () => {
            try {
                const response = await fetch(`https://bigburgerbackend-1.onrender.com/api/additionals`);
                const data = await response.json();
                setAdditionals(data.data);
            } catch (error) {
                console.error("Error fetching additionals:", error);
            }
        };

        fetchAdditional();
    }, []);






    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-[90] lg:mt-[5rem]">
            <div className="h-full bg-black bg-opacity-95 p-6 rounded-lg shadow-lg relative lg:w-[60vw] lg:h-[80vh]">

                <div className="">
                    <button className="absolute top-4 right-4 text-2xl text-white" onClick={closeModal}>
                        <IoMdClose />
                    </button>
                </div>

                <div className="flex w-[100%]">

                    <div className="hidden lg:flex  items-center justify-center w-[50%]">
                        <img className="w-[20rem]" src={`${productos.thumbnail}`} alt={productos.title} />
                    </div>

                    <div className="max-h-[80vh] lg:w-[50%] flex flex-col gap-5 overflow-y-auto lg:max-h-[70vh] p-4 scrollbar-hide">
                        <div className="flex flex-col items-center gap-[1rem]">
                            <h2 className="text-[20px] font-bold">Burger {productos.title}</h2>
                            <img className="lg:hidden w-[10rem]" src={`${productos.thumbnail}`} alt={productos.title} />
                            <p className="text-[14px]">${productos.price}</p>
                            <p className="text-[14px]">{productos.description}</p>
                        </div>

                        {/* MAP DE COMBOS */}
                        <div className="flex items-center justify-center gap-[1rem]">
                            {additionals.map((a) => {
                                if (a.category === 'Combo') {
                                    return (
                                        <div key={a._id} className="cursor-pointer flex flex-col items-center justify-center">
                                            <label className="flex flex-col items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="burgerType"
                                                    value={a._id}
                                                    checked={selectedBurger === a._id}
                                                    onChange={() => setSelectedBurger(a._id)}
                                                    className="hidden"
                                                />
                                                <img
                                                    className={`w-[2.5rem] h-[2.5rem] ${selectedBurger === a._id ? "brightness-50" : ""}`}
                                                    src={a.thumbnail}
                                                    alt={a.title}
                                                />
                                                <span className="text-[12px]">{a.title}</span>
                                            </label>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        {/* MAP DE AGREGADOS */}
                        <div className="m-[1rem]">
                            <div className="flex items-center">
                                <p className="font-bold mb-[1rem]">Adicionales:</p>
                            </div>
                            <div className="flex flex-col gap-[1rem] w-full">
                                {additionals.map((a) => {
                                    if (a.category === 'Agregados') {
                                        return (
                                            <div key={a._id} className="flex items-center justify-between w-full gap-[2rem]">
                                                <div className="flex items-center justify-center gap-[.5rem]">
                                                    <div className="flex items-center justify-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`feature-${a._id}`}
                                                            name="features"
                                                            checked={selectedFeatures.includes(a._id)}
                                                            onChange={() => handleFeatureChange(a._id)}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor={`feature-${a._id}`}>
                                                            <div className="text-[13px]">
                                                                <p className="">{a.title}</p>
                                                                <small>+ $ {a.price}</small>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <img className="w-[50px] lg:ml-[1rem]" src={`${a.thumbnail}`} alt={a.title} />
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>

                        </div>
                        {/* MAP DE BEBIDAS */}
                        <div className="m-[1rem]">
                            <div className="flex items-center">
                                <p className="font-bold mb-[1rem]">Bebidas:</p>
                            </div>

                            <div className="flex flex-col gap-[1rem] w-full">
                                {additionals.map((a) => {
                                    if (a.category === 'Bebidas') {
                                        return (
                                            <div key={a._id} className="flex items-center justify-between w-full gap-[2rem]">
                                                <div className="flex items-center justify-center gap-[.5rem]">
                                                    <div className="flex items-center justify-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`drink-${a._id}`}
                                                            name="drink"
                                                            checked={selectedDrinks.includes(a._id)}
                                                            onChange={() => handleDrinkChange(a._id)}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor={`drink-${a._id}`}>
                                                            <div className="text-[13px]">
                                                                <p>{a.title}</p>
                                                                <small>+ $ {a.price}</small>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <img className="w-[25px]" src={`${a.thumbnail}`} alt={a.title} />
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>

                        {user ? <div className="sticky -bottom-[20px] p-3 flex items-center justify-center bg-black font-bold">
                            <div>
                                <button
                                    className="flex items-center justify-between w-full"
                                    onClick={handleSubmit}>
                                    Agregar al carrito - ${totalPrice}
                                </button>
                                <ToastContainer />
                            </div>
                        </div> : null}
                    </div>
                </div>




            </div>
        </div>
    );
};

export default Modal2;