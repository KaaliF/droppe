import { count } from 'console';
import React, { useEffect, useState } from 'react';
import Cart from './cart/container/Cart';
import Checkout from './checkoutmodal/container/Checkout';
import { CartProps } from './interfaces/CartProps';
import { CountProps } from './interfaces/Count';
import { ProductProps } from './interfaces/ProductProps';
import { UserProps } from './interfaces/UserProps';
import http from './Service/http';

//Main Component of the application. 

function Layout() {
    const [carts, setCarts] = useState<CartProps[]>([]);
    const [products, setProducts] = useState([]);
    const [users, setUser] = useState([]);
    const [visible, setVisible] = useState(false);
    async function getData(params: string) {
        const response = await http.get(params);
        const { data, status } = response;
        if (status === 200) {
            return data;
        }
    }

    useEffect(() => {
        //Api is called to fetch all the item once then we can handle them at the local level. 
        //Otherwise we have to call api again and again on ID bases. 
        async function apiCall() {
            setProducts(await getData('products'));
            setUser(await getData('users'));
            setCarts(await getData('carts'));
        }
        apiCall();

    }, []);

    useEffect(() => { calculateDiscount() }, [carts])

    function handleIncrement(param: number, id: number) {
        // Handles the increment in the product.
        let cart = [...carts];
        cart.map((item: CartProps) => {
            if (item.id === id) {
                return item.products.map((product: ProductProps) => { if (product.productId === param) product.quantity += 1; return product; })

            }
        })
        // calculateDiscount();
        setCarts(cart);
    }

    function handleDecrement(param: number, id: number) {
        // Handles the decrement in product.
        let cart = [...carts];
        cart.map((item: CartProps) => {
            if (item.id === id) {
                return item.products.map((product: ProductProps) => { if (product.productId === param) product.quantity -= 1; return product; })

            }
        })
        // calculateDiscount();
        setCarts(cart);
    }

    function calculateDiscount() {
        // Calculates the disscount on identical added products on different carts. 
        const obj = [...carts];
        const tempProducts = [...products];
        const productIds: Array<number> = [];
        const counts: CountProps = {};
        obj.map((cart: CartProps) => cart.products.map((product: ProductProps) => {
            productIds.push(product.productId);
        }));
        productIds.forEach((x: number) => {
            counts[x] = (counts[x] || 0) + 1;
        });
        tempProducts.map((product: ProductProps) => {

            if (counts[product.id] > 1) {
                const num = (product.price - (product.price * (counts[product.id] * 10) / 100));
                product.disscountedPrice = num;
                product.disscount = counts[product.id] * 10;
            }
            else {
                product.disscountedPrice = product.price;
                product.disscount = 0;
            }
            return product;
        });
        setProducts(tempProducts);
    }

    function handleDiscount(id: number) {
        let count: number = 0;
        const obj = [...carts];
        obj.map((cart: CartProps) => cart.products.map((product: ProductProps) => {
            if (product.productId === id)
                count++;
        }));
        return count;

    }
    function getProductById(id: number) {
        // We can get product locally after fetching once on id basis. 
        const product = products.filter((item: ProductProps) => {
            if (item.id === id)
                return item;
        });
        if (product.length !== 0)
            return product[0];
        return product;
    }

    function getUserById(id: number) {
        // We can get user locally after fetching once on id basis. 
        const user = users.filter((item: UserProps) => {
            if (item.id === id)
                return item;
        });
        if (user.length !== 0)
            return user[0];
        return user;
    }

    function discardProduct(param: number, id: number) {
        // This logics handle the discard product.
        let cart = [...carts];
        cart.map((item: CartProps) => {
            if (item.id === id) {
                return item.products = item.products.filter((product: ProductProps) => { if (product.productId !== param) return product; })
            }
        })
        setCarts(cart);
    }

    async function updateCart(id: number) {
        // update or approve the cart.
        const cart = carts.filter((item: CartProps) => { if (item.id === id) return item; });
        if (cart.length !== 0) {
            const obj: CartProps = cart[0];
            try {
                const { data, status } = await http.put('carts/' + obj.id, obj);
                if (status === 200) {
                    alert('Carts approved');
                }
            }
            catch (e) {
            }
        }
    }

    async function multipleApiCall() {
        // Main approval that can be called from the checkout list.
        const updateCarts = [...carts];
        return await Promise.all(
            await updateCarts.map(async (item: CartProps) => {
                try {
                    const { data, status } = await http.put('carts/' + item.id, item);
                    if (status === 200) {
                        return data;
                    }
                }
                catch (e) {
                }
            }));
    }

    async function approveAll() {
        try {
            const data: CartProps[] = await multipleApiCall();
            setVisible(false);
            setCarts(data);
            alert('All Carts approved');
        }
        catch (e) {

        }
    }
    return (<>
        {visible && <Checkout approveAll={approveAll} carts={carts} getProductById={getProductById} setVisible={setVisible} visible={visible} getUserById={getUserById} />}
        {carts.map((item: CartProps, index: number) => <Cart key={index} {...item} getProductById={getProductById} getUserById={getUserById} handleIncrement={handleIncrement} updateCart={updateCart} discardProduct={discardProduct} handleDecrement={handleDecrement} handleDiscount={handleDiscount} />)}
        {carts.length !== 0 && <button className='checkoutButton' onClick={() => setVisible(true)}>Checkout</button>}
    </>)
}

export default Layout;