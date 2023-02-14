import { Link } from "react-router-dom";
import MenuSection from "./MenuSection.jsx";
import { Button } from "@mantine/core";

const RestaurantPage = ({ restaurant, restaurantID }) => {
  const orderID = "10";
  // console.log(restaurant)

  return (
    <div>
      <img src={restaurant.profile.photo}></img>
      <div>{restaurant.profile.description}</div>
      <div>
        {Object.values(restaurant.menu_sections).map((s) => (
          <MenuSection menu_section={s} />
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
