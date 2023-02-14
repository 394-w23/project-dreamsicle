import { Link } from "react-router-dom";
import MenuSection from "./MenuSection.jsx";
import { Button } from "@mantine/core";

const RestaurantPage = ({ restaurant, cart,setCart }) => {
  const orderID = "10";

  return (
    <div>
      <img src={restaurant.profile.photo}></img>
      <div>{restaurant.profile.description}</div>
      <div>
        {Object.values(restaurant.menu_sections).map((s) => (
          <MenuSection menu_section={s} cart= {cart} setCart={setCart}/>
        ))}
      </div>
      <Link
        to={`/${restaurant.id}/${orderID}`}
        style={{ textDecoration: "none" }}
      >
        <Button>Check out order</Button>
      </Link>
    </div>
  );
};

export default RestaurantPage;
