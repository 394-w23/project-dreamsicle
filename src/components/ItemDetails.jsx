import { useState } from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Alert,
  Drawer,
  Group,
  Button,
  useMantineTheme,
  Title,
  Checkbox,
  Radio,
} from "@mantine/core";
import QuantitySelector from "./QuantitySelector";
import "./MenuItem.css";
import uuid from "react-uuid";
import { BiErrorCircle } from "@react-icons/all-files/Bi/BiErrorCircle";

const ItemDetails = ({
  updateOrders,
  itemDetails,
  itemDetailsOpened,
  setItemDetailsOpened,
  setCartData,
  cartData,
  setItemDetails,
}) => {
  const theme = useMantineTheme();
  const id = 0; ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////TODO: Hardcoded user ID
  const [quantity, setQuantity] = useState(0);
  const [raiseAlert, setRaiseAlert] = useState(false);

  const addToCart = () => {
    const new_uuid = uuid();
    // console.log("quantity before new_order",quantity)
    if (quantity === 0) {
      setRaiseAlert(true);
    } else {
      const new_order = {
        id: new_uuid,
        item: itemDetails.id,
        quantity: quantity,
      };
      if (cartData.orders) {
        console.log("A");
        console.log(new_order);
        // append to existing orders
        const new_data = {
          ...cartData,
          orders: { ...cartData.orders, [new_uuid]: new_order },
        };
        // console.log("new_data to existing orders",new_data)
        setCartData(new_data);
        updateOrders({ ...cartData.orders, [new_uuid]: new_order });
      } else {
        console.log("B");
        // create new orders attribute thingy
        const new_data = { ...cartData, orders: { [new_uuid]: new_order } };
        // console.log("new_data to nonexisting orders",new_data)
        setCartData(new_data);
        updateOrders({ [new_uuid]: new_order });
      }
      // console.log(cartData.orders)
      setQuantity(0);
      setItemDetailsOpened(false);
      setRaiseAlert(false);
    }
  };
  const closeDrawer = () => {
    setQuantity(0);
    setItemDetailsOpened(false);
  };


  // handle addons

  const handleAddOns = (selected, b) => {
    console.log(selected, b)
  }

  const [limitedAddOns, setLimitedAddOns] = useState([]);

  const handleAddOnsWithLimits = (selected, limit) => {
    setLimitedAddOns(selected.splice(selected.length - limit, selected.length))
    // TODO: handle pricing
  }



  return (
    <Drawer
      opened={itemDetailsOpened}
      onClose={() => closeDrawer()}
      title="Item Details"
      position="bottom"
      size="93%"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      padding="lg"
      root={{ backgroundColor: "red" }}

    >
      <div className="menu-item" style={{ overflow: "scroll" }}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image src={itemDetails.photo} height={160} alt="Menu item image" />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{itemDetails.name}</Text>
            <Text weight={500}>${itemDetails.price}</Text>
          </Group>
          {itemDetails["customizable-categories"] && (
            <Group position="apart" mt="md" mb="xs">
              <Title size="h3" >Customization Options</Title>
              {itemDetails["customizable-categories"].map((category) => {


                return (
                  <Group style={{ flexDirection: "column", alignItems: "flex-start" }} position="apart" mt="md" mb="xs">
                    <Title size="h4">{category.name}</Title>

                    {/* Radio group or checkbox group */}
                    {category["required-select-amount"] == 0 ?

                      <Checkbox.Group style={{ flexDirection: "column", alignItems: "flex-start" }} onChange={(e) => { handleAddOns(e, category["customizable-add-ons"]) }}>
                        {category["customizable-add-ons"].map((addOn, index) =>
                          <Checkbox key={index} value={addOn.name} label={addOn.name} style={{ width: "100%" }} />)}
                      </Checkbox.Group>
                      :
                      <Checkbox.Group style={{ flexDirection: "column", alignItems: "flex-start" }} value={limitedAddOns} onChange={(e) => { handleAddOnsWithLimits(e, category["required-select-amount"]) }}>
                        {category["customizable-add-ons"].map((addOn, index) =>
                          <Checkbox key={index} value={addOn.name} label={addOn.name} style={{ width: "100%" }} />)}
                      </Checkbox.Group>
                    }
                  </Group>
                );
              })}
              <Text weight={500}></Text>
            </Group>
          )}

          <Group position="apart" mt="md" mb="xs">
            <Text>{itemDetails.servings} servings</Text>
            <QuantitySelector setQuantity={setQuantity} quantity={quantity} />
          </Group>
          <Text position="right">
            Subtotal: ${quantity * itemDetails.price}
          </Text>
        </Card>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Button className="submit-button" onClick={addToCart}>
            Add To Cart
          </Button>
        </div>
        {raiseAlert && (
          <Alert
            icon={<BiErrorCircle size={16} />}
            title="Minimum Order"
            color="red"
          >
            You must order at least 1 to add to cart!
          </Alert>
        )}
      </div>
    </Drawer>
  );
};

export default ItemDetails;
