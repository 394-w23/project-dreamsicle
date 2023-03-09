import MenuItem from "./MenuItem.jsx"
import { Title } from '@mantine/core';
import './MenuSection.css';


const MenuSection = ({ menu_section, setCartData, cartData, setItemDetails, setItemDetailsOpened }) => {
    const orderID = '10'

    return (
        <div className="section"><Title className="section-title" weight={500}>{menu_section.name}</Title>
            {menu_section.items.map(s => <MenuItem key={s.id} cartData={cartData} setItemDetailsOpened={setItemDetailsOpened} setItemDetails={setItemDetails} setCartData={setCartData} menu_item={s} section_id={menu_section.id} />)} </div>
    );
};

export default MenuSection
