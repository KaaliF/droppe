import React from 'react';
import { CartProps } from '../../interfaces/CartProps';
import Products from '../../product/container/Product';

function Carts(props: CartProps) {
    // All the things in component folder are only associated with the rendering
    const { name, cartTotal, updateCart, id } = props;
    return (<div className='card'>
        <div className='container'>
            <h4><b>{name.firstname} {name.lastname}</b></h4>
            <Products {...props} />
            <button onClick={async () => await updateCart(id)} className='approveButton'>Approve</button>
        </div>
        <div className='totalAmount' >Total: {cartTotal} </div>

    </div>);
}
export default Carts;