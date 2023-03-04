import { FaTrash } from "@react-icons/all-files/Fa/FaTrash"
import { Button, Table } from "@mantine/core";
import { menuItemParser, itemAddOnParser } from '../utils/helper'
import "./OrderTable.css";

export default function OrderTable({ restaurant, cartData, deletable, removeOrder }) {
  let rows = []
  // console.log(cartData.orders, " =-------- ", restaurant)



  let total_price = 0
  Object.values(cartData.orders).forEach(i => {
    let item = menuItemParser(i, restaurant);
    let addOnList = itemAddOnParser(i, item);
    let full_item_price=item.price;
    for (let j=0;j<addOnList.length;j++) {
      full_item_price+=addOnList[j].price;
    }
    total_price += (i.quantity * full_item_price)

  })




  rows = Object.values(cartData.orders).map((order) => {
    let item = menuItemParser(order, restaurant);
    let addOnList = itemAddOnParser(order, item);
    // console.log("addOnList", addOnList);
    let full_item_price=item.price;
    for (let i=0;i<addOnList.length;i++) {
      full_item_price+=addOnList[i].price;
    }
    return (
      <>
        <tr key={order.id}>
          <td>{item.name}</td>
          <td>{order.quantity}</td>
          <td>${(full_item_price * order.quantity).toFixed(2)}</td>
          {deletable && <td><Button compact variant="subtle" onClick={() => removeOrder(order)}><FaTrash /></Button></td>}
        </tr>
        {addOnList.map((addOn) => { return(
          <div className="addOn">
            {addOn.name}{addOn.price ? ` (+$${addOn.price})` : ""}
          </div>)
        })}


      </>

    )
  });
  rows.push(<tr key={0}>
    <td><span style={{ fontWeight: 'bold' }}>Total</span></td>
    <td></td>
    <td><span style={{ fontWeight: 'bold' }}>${total_price.toFixed(2)}</span></td>
    {deletable && <td></td>}
  </tr>)
  return (
    <Table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
          {deletable && <th></th>}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>

  )

}


