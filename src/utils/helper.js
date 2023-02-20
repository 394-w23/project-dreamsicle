export const menuItemParser = (order, restaurant) => {
    let menuSections = restaurant.menu_sections;
    let item;
    try {
      for (let menuSectionIndex = 0; menuSectionIndex < menuSections.length; menuSectionIndex++) {
        let menuSectionItems = menuSections[menuSectionIndex].items;
        console.log(menuSectionItems, "---- ");
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