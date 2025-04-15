import NavBarForMenuComp from "../../shared/NavBar/NavBarForMenuComp"
import CategorySection from "./CategorySection";
import { useCart } from '../context/NewContext'


const Menu = () => {
    const { products } = useCart();
    const categorias = ["Classic", "BBQ", "Bacon", "Chicken", "Vegan"];

    return (
        <div className="">
            <NavBarForMenuComp />
            <div className="flex flex-col items-center justify-center mt-[4rem] lg:mt-0">
                <div className="flex flex-col">
                    {categorias.map((categoria) => (
                        <CategorySection key={categoria} category={categoria} productos={products} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Menu