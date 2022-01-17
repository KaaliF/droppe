import React, { useEffect, useState } from 'react';
import { CartProps } from '../../interfaces/CartProps';
import { ProductProps } from '../../interfaces/ProductProps';
import Carts from '../component/Cart';
import '../style/cart.css'
function Cart(props: CartProps) {
    // All the things in container folder are only associated with the logic, it recommended  calling api or logic related things here.

    const { getUserById, userId, products, getProductById } = props;
    const [cartTotal, setCartTotal] = useState(0);
    function calculateTotal() {
        // Calculates the total of the single cart.
        const total = products.map((item: ProductProps) => {
            const product = getProductById(item.productId);

            return product.disscountedPrice * item.quantity;
        });
        setCartTotal(total.reduce((a: number, b: number) => a + b, 0));
    }

    const user = getUserById(userId);
    const { name } = user;
    return <Carts name={name} cartTotal={cartTotal} calculateTotal={calculateTotal} {...props} />;

}
export default Cart;