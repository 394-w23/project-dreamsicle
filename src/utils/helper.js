export const tags = ["vegetarian", "gluten-free", "spicy", "szechuan-cuisine", "chinese-food"]

export const menuItemParser = (order, restaurant) => {
  let menuSections = restaurant.menu_sections;
  let item;
  try {
    for (let menuSectionIndex = 0; menuSectionIndex < menuSections.length; menuSectionIndex++) {
      let menuSectionItems = menuSections[menuSectionIndex].items;
      for (let itemIndex = 0; itemIndex < menuSectionItems.length; itemIndex++) {
        if (menuSectionItems[itemIndex].id == order.item) {
          item = menuSectionItems[itemIndex];
          break;
        }
      }
      // break
    }
  } catch (e) {
    console.log(e);
  }
  return item;
};

export const itemAddOnParser = (order, item) => {
  let addOnsOutput = [];
  // if (item.hasOwnProperty("customizable-categories")) {
  let customizableCategories = item["customizable-categories"];
  let addOnsIds = order.add_ons;
  try {
    if (customizableCategories !== undefined) {
      for (let categoryIndex = 0; categoryIndex < customizableCategories.length - 1; categoryIndex++) {
        let addOns = customizableCategories[categoryIndex]["customizable-add-ons"];
        for (let addOnIndex = 0; addOnIndex < addOns.length; addOnIndex++) {
          if (addOnsIds.length && addOnsIds.includes(addOns[addOnIndex].id)) {
            addOnsOutput.push(addOns[addOnIndex]);
          }
        }
        // break
      }
    }

  } catch (e) {
    console.log(e);
  }
  return addOnsOutput;
};

export const getTotalOrderPrice = (restaurant, cartData) => {
  let total_price = 0
  Object.values(cartData.orders).forEach(i => {
    let item = menuItemParser(i, restaurant);
    let addOnList = itemAddOnParser(i, item);
    let full_item_price = item.price;
    for (let j = 0; j < addOnList.length; j++) {
      full_item_price += addOnList[j].price;
    }
    total_price += (i.quantity * full_item_price)

  })
  return total_price;
}