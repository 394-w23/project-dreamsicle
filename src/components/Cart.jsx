import React from 'react';
import { Button, Text, Group, Modal, Table, Drawer } from "@mantine/core";

export default function Cart({cartOpened, setCartOpened, rows}) {

  return (
   
    <Drawer
    opened={cartOpened}
    onClose={setCartOpened}
    title="Your cart"
    position="bottom"
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

  </Drawer>
  )
}