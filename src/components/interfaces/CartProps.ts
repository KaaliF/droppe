import { ProductProps } from "./ProductProps";

export interface CartProps {
    id: number,
    userId: number,
    date: string,
    products: ProductProps,
    name?: any,
    [key: string]: any,
}