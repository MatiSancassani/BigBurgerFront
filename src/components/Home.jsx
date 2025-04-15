import Header from './Header'
import NavBar from '../shared/NavBar/NavBar'
import Social from './Social'
import Cart from './cart/Cart'
import { useCart } from './context/NewContext'

const Home = () => {
    const { user } = useCart();

    return (
        <>
            <NavBar />
            <Social />
            <Header />
            {user && <Cart />}

        </>

    )
}

export default Home