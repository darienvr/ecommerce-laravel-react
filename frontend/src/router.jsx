import {Navigate, createBrowserRouter} from 'react-router-dom';
import ProductsView from './views/ProductsView'
import SingleProductView from './views/SingleProductView'

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
])

export default router;