import {Navigate, createBrowserRouter} from 'react-router-dom';
import ProductsView from './views/ProductsView'
import SingleProductView from './views/SingleProductView'
import Cart from './views/CartView'
import Payment from './views/PaymentView'
import Home from './views/HomeView'
import Login from './views/Login'
import Orders from './views/OrdersView'
import GuestLayout from './components/GuestLayout'
import Signup from './views/Signup'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/products" />,
    },
    {
        path: '/home',
        element: <Home />,
    },
    {
        path: '/products',
        element: <ProductsView />,
    },
    {
        path: '/product/:id',
        element: <SingleProductView />,
    },
    {
        path: '/cart',
        element: <Cart />,
    },
    {
        path: '/payment',
        element: <Payment/>,
    },
    {
        path: '/orders',
        element: <Orders/>,
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
])

export default router;