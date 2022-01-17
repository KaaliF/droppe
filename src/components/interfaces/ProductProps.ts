export interface ProductProps {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: any,
    [key: string]: any
}
export interface ProductsProps {

    [key: string]: any
}
export interface ProductComponentProps {
    product: ProductProps,
    quantity: number,
    id: number;
    [key: string]: any
}