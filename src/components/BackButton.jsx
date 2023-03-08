import { Button } from '@mantine/core';
import { Link, useLocation } from "react-router-dom";
// import { FirebaseLogout } from "../utils/firebase";
import { RiArrowLeftLine } from "@react-icons/all-files/ri/RiArrowLeftLine"

const BackButton = () => {

  let selection = useLocation().pathname.split("/")[1];
  // console.log("useParams()", useParams());

  return (<div style={{ display: "flex" }}>
    <div >
      <Link to={`/${selection}`} style={{ textDecoration: 'none' }}><Button leftIcon={<RiArrowLeftLine style={{ padding: '0' }} size={20} />} style={{ padding: '0vh 1.2vh 0vh 1.2vh' }}>{selection.charAt(0).toUpperCase() + selection.slice(1)}</Button></Link>
    </div >
  </div >);
}

export default BackButton;
