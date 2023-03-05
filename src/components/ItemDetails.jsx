import "./ItemDetails.css"
import { useEffect, useRef, useState } from "react";
import { Card, Image, Text, Badge, Alert, Drawer, Group, Button, useMantineTheme, Title, Checkbox, Radio, } from "@mantine/core";
import QuantitySelector from "./QuantitySelector";
import uuid from "react-uuid";
import { BiErrorCircle } from "@react-icons/all-files/Bi/BiErrorCircle";

const ItemDetails = ({updateOrders,itemDetails,itemDetailsOpened,setItemDetailsOpened,setCartData,cartData,
  setItemDetails,
}) => {
  // Handle AddOns
  const [addOnTotalPrice, setAddOnTotalPrice] = useState(0);
  const [combinedAddOns, setCombinedAddOns] = useState({});
  const [initialAddOnErrors, setInitialAddOnErrors] = useState({}); // generated on open cart
  const [finalAddOnErrors, setFinalAddOnErrors] = useState({}); // generated on final submission

  const theme = useMantineTheme();
  const id = 0; ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////TODO: Hardcoded user ID
  const [quantity, setQuantity] = useState(1);
  const [raiseAlert, setRaiseAlert] = useState(false);
  const errorsRef = useRef(null)
  console.log(finalAddOnErrors)
  console.log(initialAddOnErrors)

  const addToCart = () => {
    const new_uuid = uuid();
    let addOnsList = [];
    let categoryKeys = Object.keys(combinedAddOns)
    let initialErrors = { ...initialAddOnErrors }
    let addOnErrors = {}

    categoryKeys.map(cKey => {
      let cValue = combinedAddOns[cKey];
      if (cValue.valid) {
        delete initialErrors[cKey] // delete from errors because it's not an error now
      }
      if (Object.values(initialErrors).length > 0) {
        addOnErrors = initialErrors;
        setFinalAddOnErrors(addOnErrors);
      } else {
        addOnErrors = {}
      }
      cValue.ids.map(addOn => {
        addOnsList.push(JSON.parse(addOn).id)
      })
    })

    if (Object.values(addOnErrors).length > 0) {
      errorsRef.current.scrollIntoView({ behavior: 'smooth' });
      return
    }

    if (quantity === 0) {
      setRaiseAlert(true);
      errorsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      const new_order = {
        id: new_uuid,
        item: itemDetails.id,
        quantity: quantity,
        add_ons: addOnsList
      };
      if (cartData.orders) {
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
        // create new orders attribute thingy
        const new_data = { ...cartData, orders: { [new_uuid]: new_order } };
        // console.log("new_data to nonexisting orders",new_data)
        setCartData(new_data);
        updateOrders({ [new_uuid]: new_order });
      }
      // console.log(cartData.orders)
      setQuantity(1);
      setItemDetailsOpened(false);
      setRaiseAlert(false);
    }
  };
  const closeDrawer = () => {
    setCombinedAddOns({})
    setQuantity(1);
    setRaiseAlert(false);
    setInitialAddOnErrors({})
    setFinalAddOnErrors({})
    setItemDetailsOpened(false);
  };




  // initialize required amount errors to use when validating selctions on add to cart
  useEffect(() => {
    if (itemDetails && itemDetails["customizable-categories"]) {
      let c_categories = itemDetails["customizable-categories"];
      let errors = {}
      c_categories.map(cat => {
        if (cat["required-select-amount"]) {
          errors[cat.name] = `${cat.name} requires ${cat["required-select-amount"]} items to be selected`
        }
      })
      setInitialAddOnErrors(errors)
    }
    setCombinedAddOns({})
  }, [itemDetails])

  const handleSelectedAddOnsFormat = (selected, limit, category) => {
    let addOns = combinedAddOns[category] || [];
    if (limit == 0) {
      addOns = selected;
    } else {
      addOns = selected.splice(selected.length - limit, selected.length)
    }

    let rawAddOns = { ...combinedAddOns };
    let rawAddOnsCategory = rawAddOns[category] || {}
    rawAddOnsCategory.ids = addOns;
    rawAddOnsCategory.required_amount = limit;
    rawAddOnsCategory.valid = limit == 0 || addOns.length == limit
    rawAddOns[category] = rawAddOnsCategory
    setCombinedAddOns(rawAddOns);
  }

  // helper to calculate the total of the add on prices
  const calculateAddOnPrices = (selectedAddOns) => {
    let total = 0;
    let arrays = Object.values(selectedAddOns)
    arrays.map(array => {
      array.ids.map(x => {
        let price = Number(JSON.parse(x).price);
        total += price;
      })
    })
    return total;

  }

  // handle price total for add on selections
  useEffect(() => {
    setAddOnTotalPrice(calculateAddOnPrices(combinedAddOns));
  }, [combinedAddOns])

  let placeholderImage = "https://theme-assets.getbento.com/sensei/f9c493b.sensei/assets/images/catering-item-placeholder-704x520.png";

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


    >
      <div className="menu-item" >
        <Card shadow="sm" p="lg" radius="md" withBorder >
          <Card.Section>
            <Image src={itemDetails.photo !== "n/a" ? itemDetails.photo : placeholderImage} height={160} alt="Menu item image" />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{itemDetails.name}</Text>
            <Text weight={500}>${itemDetails.price}</Text>
          </Group>
          {itemDetails["customizable-categories"] && (

            <Group style={{ flexDirection: "column", alignItems: "flex-start" }} position="apart" mt="md" mb="xs">
              <Title size="h3" >Customization Options</Title>
              {itemDetails["customizable-categories"].map((category, index) => {
                return (
                  <Group key={index} style={{ flexDirection: "column", alignItems: "flex-start" }} position="apart" mt="md" mb="xs">
                    <Title size="h4">{category.name}</Title>

                    <Checkbox.Group style={{ flexDirection: "column", alignItems: "flex-start" }} value={combinedAddOns[category.name] && combinedAddOns[category.name].ids} onChange={(e) => { handleSelectedAddOnsFormat(e, category["required-select-amount"], category.name) }}>
                      {category["customizable-add-ons"].map((addOn, index) =>
                        <Checkbox key={index} value={JSON.stringify(addOn)} label={addOn.price ? `${addOn.name} (+$${addOn.price})` : addOn.name} style={{ width: "100%" }} />)}
                    </Checkbox.Group>

                  </Group>
                );
              })}
              <Text weight={500}></Text>
            </Group>
          )}

          <Group position="apart" mt="md" mb="xs">
            <Text>{itemDetails.servings} servings</Text>
            <QuantitySelector setQuantity={setQuantity} quantity={quantity} minAllowedAmount={0} />
          </Group>
          <Text position="right">
            Subtotal: ${(isNaN(quantity) ? "0.00" : ((quantity * itemDetails.price) + (quantity * addOnTotalPrice)).toFixed(2))}
          </Text>

          <div style={{ textAlign: "center", marginTop: 20, marginBottom: 100, }} >
            {Object.values(finalAddOnErrors).map((error, index) => <Alert key={index} style={{ marginBottom: 10 }} title="There was a problem" color="red">
              {error}
            </Alert>)}
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


          <div ref={errorsRef}></div>

        </Card>

        <div className="floating-submit-button" style={{ bottom: "5%" }}>
          <Button onClick={addToCart}>
            Add To Cart
          </Button>
        </div>

      </div>
    </Drawer>
  );
};

export default ItemDetails;
