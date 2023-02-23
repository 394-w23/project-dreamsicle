import { ActionIcon, Button } from "@mantine/core";
import "./Header.css";
// import { FirebaseLogout } from "../utils/firebase";

const Header = () => {
//   const logout = () => {
//     FirebaseLogout().then(()=> {
//       console.log("logged out")
//     })
//   }

  return (<div style={{display: "flex"}} className="header-top-row">
    <div className="header-group">
      <h2 className="app-name">Platter Pal</h2>      
      {/* <div style={{width: "25%",display: "flex", justifyContent: "right"}}>
        <Button onClick={logout} size="xs">Logout</Button>
      </div> */}
      
    </div>
  </div>);
}

export default Header;
