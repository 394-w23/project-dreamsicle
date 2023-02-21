import { FaTrash } from "@react-icons/all-files/Fa/FaTrash"
import { Button,  Table } from "@mantine/core";


export default function OrderTable({ restaurant, cartData, updateOrders, setDrawerState }) {
    let rows = []
    // console.log(cartData.orders, " =-------- ", restaurant)
    
  
      rows = Object.values(cartData.orders).map((order) => {
        let item = restaurantDetailsHelper(order, restaurant);
        console.log("item", item)
        return (
          <tr key={order.id}>
            <td>{item.name}</td>
            <td>{order.quantity}</td>
            <td>${item.price * order.quantity}</td>
            <td><Button compact variant="subtle"><FaTrash /></Button></td>
          </tr>
        )
      }
      )

  }
  

