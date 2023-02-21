import { FaTrash } from "@react-icons/all-files/Fa/FaTrash"
import { Button, Table } from "@mantine/core";
import { menuItemParser } from '../utils/helper'


export default function OrderTable({ restaurant, cartData }) {
  let rows = []
  // console.log(cartData.orders, " =-------- ", restaurant)



  let total_price = 0
  Object.values(cartData.orders).forEach(i => {
    total_price += i.quantity * (menuItemParser(i, restaurant).price)
  })


  rows = Object.values(cartData.orders).map((order) => {
    let item = menuItemParser(order, restaurant);
    return (
      <tr key={order.id}>
        <td>{item.name}</td>
        <td>{order.quantity}</td>
        <td>${item.price * order.quantity}</td>
        <td><Button compact variant="subtle"><FaTrash /></Button></td>
      </tr>
    )
  });
  rows.push(<tr key={0}>
    <td><span style={{ fontWeight: 'bold' }}>Total</span></td>
    <td></td>
    <td><span style={{ fontWeight: 'bold' }}>${total_price}</span></td>
    <td></td>
  </tr>)
  return (
    <Table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quanity</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>

  )

}


