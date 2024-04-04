import {Navigate, createBrowserRouter} from 'react-router-dom';
import ProductsView from './views/ProductsView'
import SingleProductView from './views/SingleProductView'
import Cart from './views/CartView'
import Payment from './views/PaymentView'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/home" />,
    },
    {
        path: '/home',
        element: <ProductsView />,
    },
    {
        path: '/product/:idProduct',
        element: <SingleProductView />,
    },
    {
        path: '/cart',
        element: <Cart />,
    },
    {
        path: '/payment',
        element: <Payment/>,
    }
])

export default router;