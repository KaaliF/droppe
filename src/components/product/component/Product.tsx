import React, { useEffect } from 'react';
import CountButtons from '../../common/CountButtons';
import { ProductComponentProps } from '../../interfaces/ProductProps';

function Product(props: ProductComponentProps) {
    const { product, quantity, handleIncrement, handleDecrement, id, calculateTotal, discardProduct } = props;
    const { rating } = product;

    function renderPrice() {
        // this function set the disscounted price 
        if (product.disscount !== 0) {
            return <>
                <s>Price: {product.price} </s>
                <div>Disscounted Price: {product.disscountedPrice} <span className='disscountTag'>{product.disscount} %</span> </div>
            </>
        }
        return <div>Price: {product.price} </div>;
    }
    useEffect(() => {
        calculateTotal();
    }, [discardProduct, quantity]);
    return (<div className='productcard'>
        <div className='container'>
            <div>Title: {product.title} <button onClick={() => discardProduct(product.id, id)} className='discardButton'>Discard</button> </div>
            {renderPrice()}
            <div>Category : {product.category}</div>
            <div>Rating: {rating.rate}</div>
            <div><img className='imgProduct' src={product.image} width='200' height='200' /></div>
            <div>Quantity: {quantity}
                <CountButtons handleIncrement={handleIncrement} handleDecrement={handleDecrement} quantity={quantity} cartId={id} productId={product.id} rating={rating} />
                <div className='totalCart'>Total: {Math.round((product.disscountedPrice * quantity) * 10) / 10}</div>
            </div>

        </div>
    </div>
    )
}
export default Product;