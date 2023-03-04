import { FaTrash } from "@react-icons/all-files/Fa/FaTrash"
import { Button, Table } from "@mantine/core";

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
  let customizableCategories = item["customizable-categories"];
  let addOnsIds=order.add_ons;
  let addOnsOutput=[];
  // console.log(customizableCategories);
  if (customizableCategories!==undefined && addOnsIds!==undefined) {
    try {  
      for (let categoryIndex = 0; categoryIndex < customizableCategories.length; categoryIndex++) {
        let addOns = customizableCategories[categoryIndex]["customizable-add-ons"];
        for (let addOnIndex = 0; addOnIndex < addOns.length; addOnIndex++) {
          if (addOnsIds.includes(addOns[addOnIndex].id)) {
            addOnsOutput.push(addOns[addOnIndex]);
          }
        }
        // break
      }
    } catch (e) {
      console.log(e);
    }
  }
  return addOnsOutput;
};
