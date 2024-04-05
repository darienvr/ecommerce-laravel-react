import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import axiosClient from '../axios'
import type { Product, Category, Cart } from "../types";


const StateContext = createContext({});

export const ContextProvider = ({ children }: { children: ReactNode }) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [filterProducts, setFilterProducts] = useState<Product[]>([]);
    const [selectCategory, setSelectCategory] = useState('All');
    const [productDetails, setProductDetails] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [cart, setCart] = useState<Cart[]>(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : [])

    const getCategories = (url: string) => {
        axiosClient.get(url)
            .then((response:any)=>{ 
                setCategories([{ id: 'All', category: 'All' }, ...response.data.categories]);
            });
    };

    const getProducts = (url: string) => {
        axiosClient.get(url)
            .then((response:any)=>{
                setProducts(response.data.data)
                setFilterProducts(response.data.data)
            });
    };

    useEffect(()=>{
        getCategories('/category');
        getProducts('/product')
    },[])

    const handleCategory = (category_id: Category['id']) => {
        setSelectCategory(category_id)
    }

    useEffect(() => {
        if (selectCategory === "All") {
          setFilterProducts(products);
        } else {
          setFilterProducts(products.filter(item => item.category_id == selectCategory));
        }
    }, [selectCategory, products]);

    const addCart = (productId:Product['id'], amount:Cart['amount']) => {
        alert('Agregado al carrito')
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product_id === productId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.product_id === productId ? { ...item, amount: item.amount + amount } : item
                );
            } else {
                return [...prevCart, { product_id: productId, amount: 1 }];
            }
        });
    }

    useEffect(() => {
        console.log(cart);
    }, [cart]); 
    
    // Actualizar el localStorage cada vez que el Cart cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    useEffect(() => {
        const fetchProductDetails = async () => {
            const promises = cart.map((item) =>
                axiosClient.get(`/product/${item.product_id}`).then((response: any) => {
                    console.log(response.data.data);
                    return response.data.data;
                })
            );

            const details = await Promise.all(promises);
            setProductDetails(details);
            setLoading(false)
        };

        fetchProductDetails();
    }, [cart]);

    const totalPrice = productDetails.reduce((total, product) => {
        const cartItem = cart.find((item) => item.product_id === product.id);
        return total + (product.price * (cartItem ? cartItem.amount : 0));
    }, 0);

    return (
        <StateContext.Provider value={{
            products,
            categories,
            filterProducts,
            cart,
            handleCategory,
            addCart,
            setCart,
            totalPrice,
            productDetails,
            loading
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)