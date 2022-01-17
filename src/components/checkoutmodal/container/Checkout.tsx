import React, { useEffect, useState } from 'react';
import { CartProps } from '../../interfaces/CartProps';
import { CheckoutProps } from '../../interfaces/CheckoutProps';
import { ProductProps } from '../../interfaces/ProductProps';
import Modal from '../component/Checkout';
import '../style/style.css';
function Checkout(props: CheckoutProps) {
    const { getUserById, getProductById, setVisible, visible, approveAll } = props;
    const [list, setList] = useState<CartProps[]>([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        // Amend and changes the cart object add product and user against id to see the final cart.
        const carts = [...props.carts];
        let count = 0;
        carts.map((cart: CartProps) => {
            cart.username = getUserById(cart.userId).name.firstname;
            cart.products.map((product: ProductProps) => {
                product.product = getProductById(product.productId);
                count += product.product.disscountedPrice * product.quantity;
                return product;
            });

            return cart;
        });
        setTotal((Math.round(count * 10) / 10));
        setList(carts);
    }, [visible]);
    return <Modal carts={props.carts} list={list} setVisible={setVisible} total={total} approveAll={approveAll} />
}

export default Checkout;