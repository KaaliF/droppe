import React from 'react';
import { CartProps } from '../interfaces/CartProps';
import { ProductProps } from '../interfaces/ProductProps';
import { TableProps } from '../interfaces/TableProps';
import './style.css';
function Table(props: TableProps) {
    // Table can be used as a common component but this logics needs to be redefined but right now I just handled it according to application, we can set the props in this component.
    const { list } = props;
    return (
        <table id='checkout'>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
                {
                    list.map((cart: CartProps, index: number) => cart.products.map((item: ProductProps, ind: number) => {
                        const { product, quantity } = item;
                        return (
                            <tr key={index.toString() + ind.toString()}>
                                <td>{cart.username}</td>
                                <td>{product.title}</td>
                                <td>{quantity}</td>
                                <td>{product.disscountedPrice}{product.disscount !== 0 && <span className='disscountTag'>{product.disscount} % off</span>}</td>
                                <td>{product.disscountedPrice * quantity}</td>
                            </tr>)
                    }

                    ))}

            </tbody>
        </table >
    );
}
export default Table;
