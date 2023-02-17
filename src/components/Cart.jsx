import { Modal, Table } from '@mantine/core'
import React, { useEffect } from 'react'

export default function Cart({cartOpened, setCartOpened}) {
    const [data, error] = useDbData("/");
    
    useEffect(()=>{

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
        {/* <tbody>{rows2}</tbody> */}
      </Table>
    </div>
  </Modal>
  )
}
