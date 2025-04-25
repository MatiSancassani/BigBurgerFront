import NavBarForMenuComp from "../../shared/NavBar/NavBarForMenuComp"
import CategorySection from "./CategorySection";
import { useState, useEffect } from "react";
import BurgerLoader from "../Loader/BurgerLoader";


const Menu = () => {
    // const { products } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://bigburgerbackend.onrender.com/api/products");
                const data = await response.json();
                setProducts(data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }

        };

        getProduct();
    }, []);
    const categorias = ["Classic", "BBQ", "Bacon", "Chicken", "Vegan"];

    return (
        <div>
            <NavBarForMenuComp />

            {loading ? (
                <div className="w-[100%] h-screen flex items-center justify-center">
                    <BurgerLoader />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-[3rem] lg:mt-[4rem]">
                    <div className="flex flex-col">
                        {categorias.map((categoria) => (
                            <CategorySection key={categoria} category={categoria} productos={products} />
                        ))}
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Menu