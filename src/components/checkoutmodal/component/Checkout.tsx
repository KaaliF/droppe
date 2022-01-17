import React from 'react';
import Table from '../../common/Table';
import { CheckoutProps } from '../../interfaces/CheckoutProps';

function Modal(props: CheckoutProps) {
    //Modal that is opened for the checkout
    const { list, setVisible, approveAll, total } = props;
    return (<div className='modal'>
        <div className='modal-content'>

            <Table list={list} />
            <div className='allTotal'>Total: {total}</div>
            <button onClick={async () => await approveAll()} className='approveButton'>Approve</button>
            <button onClick={() => { setVisible(false) }} className='approveButton'>Close</button>

        </div>

    </div>);
}

export default Modal;