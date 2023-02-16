import {Button } from '@mantine/core';
import { Link, useParams } from "react-router-dom";
// import { FirebaseLogout } from "../utils/firebase";

const BackButton = () => {

    let BackUrl = useParams()[0];
    console.log()

  return (<div style={{display: "flex"}} className="header-top-row">
    <div className="header-group">
      <Link to={`/${BackUrl}`} style={{ textDecoration: 'none' }}><Button>Back</Button> </Link>
    </div>
  </div>);
}

export default BackButton;
