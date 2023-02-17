import MenuItem from "./MenuItem.jsx"
import { Title } from '@mantine/core';
import './MenuSection.css';


const MenuSection = ({ menu_section, setCart, cart,setItemDetails }) => {
    const orderID = '10'
    // console.log(restaurant)

    return (
        <div className="section"><Title className="section-title">{menu_section.name}</Title>
            {menu_section.items.map(s => <MenuItem key={s.id} cart={cart} setItemDetails={setItemDetails}setCart={setCart} menu_item={s} section_id={menu_section.id} />)} </div>
    );
};

export default MenuSection
