import {Navigate, createBrowserRouter} from 'react-router-dom';
import ProductsView from './views/ProductsView'
import SingleProductView from './views/SingleProductView'
import Cart from './views/CartView'

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
        path: '/product/:id',
        element: <SingleProductView />,
    },
    {
        path: '/cart',
        element: <Cart />,
    }
])

export default router;