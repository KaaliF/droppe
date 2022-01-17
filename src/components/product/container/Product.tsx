import React, { useEffect } from 'react';
import { ProductsProps, ProductProps } from '../../interfaces/ProductProps';
import Product from '../component/Product';
import '../style/product.css';
function Products(props: ProductsProps) {
    const { id } = props;
    const { products, getProductById } = props;
    return (products.map((item: ProductProps, index: number) => {
        const product = getProductById(item.productId);
        return (
            <Product key={index} product={product} quantity={item.quantity} id={id}  {...props} />)
    }));
}

export default Products;