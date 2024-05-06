export interface Product {
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    category_id:string,
    sizes: string[]
}

export interface Category {
    id: string,
    category: string,
}

export interface Cart {
    id: number,
    product_id: string,
    amount: number,
    size: string,
}

export type ContextType = {
    categories: Category[],
    products: Product[],
    filterProducts: Product[],
    cart: Cart[],
    handleCategory: (i:Category['id'])=>void,
    addCart: (i:Product['id'], n:number, m:string)=>void,
    setCart: (i:any)=>void,
    totalPrice: number,
    productDetails: any,
    loading: boolean,
    deleteCart: ()=>void,
    selectCategory: string,
    searchSubmit: (i:string)=>void,
}