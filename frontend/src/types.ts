export interface Product {
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    category_id:string
}

export interface Category {
    id: string,
    category: string,
}

export interface Cart {
    product_id: string,
    amount: number,
}

export type ContextType = {
    categories: Category[],
    products: Product[],
    filterProducts: Product[],
    cart: Cart[],
    handleCategory: (i:Category['id'])=>void,
    addCart: (i:Product['id'], n:number)=>void,
    setCart: (i:any)=>void,
    totalPrice: number,
    productDetails: any,
    loading: boolean,
    deleteCart: ()=>void,
}