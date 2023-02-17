import { Modal, Table } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useDbData } from '../utils/firebase';

export default function Cart({ cartOpened, setCartOpened }) {
    const [data, error] = useDbData("/");
    const [rows, setRows] = useState([]);



    useEffect(() => {
        if (data) {

            let total_price = 0;
            let usersOrders = data.users[0].cart.orders[0] // for rest. 1
            let items = Object.values(usersOrders.items)
            console.log(items)
            let rows = items.map((itemObj) => (
                <tr key={itemObj.id}>
                    <td>{itemObj.name}</td>
                    <td>{itemObj.quantity}</td>
                    <td>${itemObj.price * itemObj.quantity}</td>
                </tr>
            ));

            rows.push(<tr key={0}>
                <td><span style={{ fontWeight: 'bold' }}>Total</span></td>
                <td></td>
                <td><span style={{ fontWeight: 'bold' }}>${total_price}</span></td>
            </tr>)


            setRows(rows)
        }

    }, [data])

    return (
        <Modal
            opened={cartOpened}
            onClose={setCartOpened}
            title="Introduce yourself!"
        >
            <div className="table">
                <Table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quanity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </div>
        </Modal>
    )
}
