import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import NavBar from '../shared/NavBar/NavBar';

const Products = () => {
    const [thumbnail, setThumbnail] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [stock, setStock] = useState(null);
    const [category, setCategory] = useState(null);
    const [productos, setProductos] = useState([]);

    const getProduct = async () => {
        try {
            const response = await fetch("https://bigburgerbackend-1.onrender.com/api/products");

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            return data.data; // 👈 Esto puede ser undefined si la API no devuelve `data`
        } catch (error) {
            console.error("Error en getProduct:", error);
            return []; // 👈 Evita que `productos` sea undefined
        }
    };

    useEffect(() => {
        getProduct().then((product) => {
            setProductos(product || []); // 👈 Asegura que sea un array
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('thumbnail', thumbnail);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('category', category);

        try {
            const response = await fetch("https://bigburgerbackend-1.onrender.com/api/products", {
                method: "POST",
                body: formData,
                credentials: "include",
            })
            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Producto agregado",
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.error || "Ocurrió un error",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "info",
                title: "Error",
                text: error.message,
            });
        }
    }

    return (
        <>
            <div className='hidden lg:block'>
                <NavBar />
            </div>
            <div className='lg:hidden fixed top-0 w-full h-[3rem] bg-black text-white flex items-center justify-around'>
                <Link to={'/'}>
                    <small>Cancelar</small>
                </Link>
                <h1 className='text-center font-bold text-[1.2rem]'>Nuevo producto</h1>
                <button type="submit" form="miFormulario">Enviar</button>

            </div>
            {/* <NavBar /> */}
            <div className='flex items-center justify-center mt-[2rem]'>
                <div className='w-full p-[1rem] lg:w-[35%]'>
                    <form id="miFormulario" onSubmit={handleSubmit}>
                        <div className='flex flex-col items-center gap-[2rem]'>
                            <div className='flex flex-col mt-[2rem] '>
                                <label className="file-upload-label"
                                    htmlFor="thumbnail"
                                >
                                    <div className="file-upload-design">
                                        <svg height="1em" viewBox="0 0 640 512">
                                            <path
                                                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                                            ></path>
                                        </svg>
                                        <p>Drag and Drop</p>
                                        <p>or</p>
                                        <span className="browse-button">Browse file</span>
                                    </div>
                                    <input
                                        type="file"
                                        name="thumbnail"
                                        id="thumbnail"
                                        onChange={(event) => setThumbnail(event.target.files[0])}
                                        accept="image/*"
                                        required />
                                </label>
                            </div>
                            <h3>Obligatorio</h3>
                            <div className='form'>
                                <input
                                    className='input'
                                    placeholder='Titulo'
                                    onChange={(event) => setTitle(event.target.value)}
                                    type="text"
                                    name="title"
                                    id="title"
                                    required />
                                <span className="input-border"></span>
                            </div>
                            <div className='form'>
                                <input
                                    className='input'
                                    placeholder='Descripcion'
                                    onChange={(event) => setDescription(event.target.value)}
                                    type="text"
                                    name="description"
                                    id="description"
                                    required />
                                <span className="input-border"></span>
                            </div>
                            <div className='form'>
                                <input className='input'
                                    placeholder='Precio'
                                    onChange={(event) => setPrice(event.target.value)}
                                    type="number"
                                    name="price"
                                    id="price"
                                    required />
                                <span className="input-border"></span>
                            </div>
                            <div className='form'>
                                <input className='input'
                                    placeholder='Stock'
                                    onChange={(event) => setStock(event.target.value)}
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    required />
                                <span className="input-border"></span>
                            </div>
                            <div>
                                <select name="category" id="category" required onChange={(event) => setCategory(event.target.value)}>
                                    <option value="">Elige una categoría</option>
                                    <option value="Classic">Classic</option>
                                    <option value="BBQ">BBQ</option>
                                    <option value="Bacon">Bacon</option>
                                    <option value="Chicken">Chicken</option>
                                    <option value="Vegan">Vegan</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='hidden w-[65%] lg:flex lg:flex-col lg:items-center lg:justify-center'>
                    <div className='flex flex-col items-center justify-center gap-[1rem]'>
                        {thumbnail ? (
                            <img src={URL.createObjectURL(thumbnail)} alt="Vista previa" />
                        ) : (
                            <p>Seleccione una imagen</p>
                        )}
                        <h5 className='text-[2rem] font-sans lg:text-xl text-center'>
                            {title ? title : "Titulo:"}
                        </h5>
                        <p className='text-[2rem] font-sans lg:text-xl text-center'>
                            {description ? description : "Descripcion:"}

                        </p>
                        <p className='text-[2rem] font-sans lg:text-xl text-center'>
                            {price ? ('$ ' + price) : `$ 0.00`}

                        </p>
                        <p className='text-[2rem] font-sans lg:text-xl text-center'>
                            {stock ? stock : "Cantidad:"}

                        </p>
                        <p className='text-[2rem] font-sans lg:text-xl text-center'>
                            {category ? category : "Seleccione una categoria"}

                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products