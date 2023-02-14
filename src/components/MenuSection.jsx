import MenuItem from "./MenuItem.jsx"

const MenuSection = ({menu_section, setCart, cart}) => {
    const orderID = '10'
    // console.log(restaurant)

    return (
            <div>{menu_section.items.map(s => <MenuItem cart = {cart} setCart={setCart} menu_item={s} section_id={menu_section.id}/>)} </div>
    );
};

export default MenuSection