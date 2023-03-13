import "./Navbar.css";
import { Text } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import orders_icon from "../../assets/orders.png"
import returns_icon from "../../assets/returns.png"
import restaurants_icon from "../../assets/restaurants.png"


const Navbar = () => {
    let selection = useLocation().pathname.split("/")[1];

    return (
        <div className="navbar">
            <Link
                to={`/browse`}
                className={`nav-button${selection==="browse" ? "-active" : ""}`}
                key={"browse"}
                id={"browse"}
            >
                <img className="nav-icon" src={restaurants_icon} width={25} />
                <Text size="xs" underline={selection === "browse"}>Browse</Text>
            </Link>

            <Link
                to={`/orders`}
                className={`nav-button${selection==="orders" ? "-active" : ""}`}
                key={"orders"}
                id={"orders"}
            >
                <img className="nav-icon" src={orders_icon} width={25} />
                <Text size="xs" underline={selection === "orders"}>Orders</Text>
            </Link>

            <Link
                to={`/returns`}
                data-cy="to-event-button"
                className={`nav-button${selection==="returns" ? "-active" : ""}`}
                key={"returns"}
                id={"returns"}
                >
                <img className="nav-icon" src={returns_icon} width={25} />
                <Text size="xs" underline={selection === "returns"}>Returns</Text>
            </Link>
        </div>
    );
};

export default Navbar;
