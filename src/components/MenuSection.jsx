import MenuItem from "./MenuItem.jsx"

const MenuSection = ({menu_section}) => {
    const orderID = '10'
    // console.log(restaurant)

    return (
            <div>{menu_section.items.map(s => <MenuItem menu_item={s}/>)} </div>
    );
};

export default MenuSection
