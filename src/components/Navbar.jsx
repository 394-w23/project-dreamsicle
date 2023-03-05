// import styled from "styled-components";
import "./Navbar.css";
import { RiAddCircleLine } from "@react-icons/all-files/ri/RiAddCircleLine";
import { ActionIcon, Menu, Button,Text } from "@mantine/core";
import { HiOutlineUserGroup } from "@react-icons/all-files/hi/HiOutlineUserGroup";
import { HiOutlineCalendar } from "@react-icons/all-files/hi/HiOutlineCalendar";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    let selection = useLocation().pathname.split("/")[1];
    // console.log(selection)
    // const [selection,setSelection]=useState("browse");
    return (
        <div className="navbar">
            <Link
                to={`/browse`}
                className="nav-button"
                key={"browse"}
                id={"browse"}
                // onClick={(e) => setSelection("browse")}
            >
                <img className="nav-icon" src="./restaurants.png" width={25} />
                <Text size="xs" underline={selection === "browse"}>Browse</Text>
            </Link>

            <Link
                to={`/orders`}
                className="nav-button"
                key={"orders"}
                id={"orders"}
                // onClick={(e) => setSelection("orders")}
            >
                <img className="nav-icon" src="./orders.png" width={25} />
                <Text size="xs" underline={selection === "orders"}>Orders</Text>
            </Link>

            <Link
                to={`/returns`}
                data-cy="to-event-button"
                className="nav-button"
                key={"returns"}
                id={"returns"}
                // onClick={() => setSelection("returns")}
                >
                <img className="nav-icon" src="./returns.png" width={25} />
                <Text size="xs" underline={selection === "returns"}>Returns</Text>
            </Link>

            {/* {displayOptions.map(opt=> <StyledNavButton key={opt} underline={selection == opt} id={opt} onClick={(e)=> setSelection(e.target.id)} >{opt}</StyledNavButton>)} */}
        </div>
    );
};

export default Navbar;

// // Nav Styled Components
// const StyledNavButton = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: 600;
//   height: 100%;
//   padding: 0 20px;
//   cursor: pointer;
//   ${(props) => props.underline && `text-decoration: underline`};
// `;

// const StyledNavArea = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   align-items: center;
//   height: 8%;
//   position: fixed;
//   width: 100%;
//   bottom: 0;
//   background-color: #efefef;
// `;
