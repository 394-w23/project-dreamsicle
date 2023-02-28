// import styled from "styled-components";
import "./Navbar.css";
import { RiAddCircleLine } from "@react-icons/all-files/ri/RiAddCircleLine";
import { ActionIcon, Menu, Button } from "@mantine/core";
import { HiOutlineUserGroup } from "@react-icons/all-files/hi/HiOutlineUserGroup";
import { HiOutlineCalendar } from "@react-icons/all-files/hi/HiOutlineCalendar";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <Link
                to={`/browse`}
                className="nav-button"
                key={"hobbies"}
                style={{ color:"black",textDecoration: "none" }}
                // underline={selection == "hobbies"}
                id={"hobbies"}
                onClick={(e) => setSelection(e.target.id)}
                
            >
                Browse
            </Link>

            <Link
                to={`/returns`}
                data-cy="to-event-button"
                className="nav-button"
                key={"events"}
                // underline={selection == "events"}
                id={"events"}
                style={{ color:"black",textDecoration: "none" }}
                onClick={(e) => setSelection(e.target.id)}>
                Returns
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
