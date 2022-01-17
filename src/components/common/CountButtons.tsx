import React from 'react';
import { CountButtonProps } from '../interfaces/CountButtonsProps';
import './style.css';
function CountButtons(props: CountButtonProps) {
    // button that handles increment and decrement for the products.
    const { handleIncrement, handleDecrement, cartId, productId, rating, quantity } = props;
    const { count } = rating;
    return (<><button disabled={count === quantity} className='incrementButton' onClick={() => handleIncrement(productId, cartId)} >+</button><button disabled={quantity === 0} onClick={() => handleDecrement(productId, cartId)} className='decrementButton'>-</button></>)
}

export default CountButtons;