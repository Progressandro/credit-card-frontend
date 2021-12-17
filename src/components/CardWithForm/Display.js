import React from "react";
import ReactCreditCard from "react-credit-cards";
import classes from "./CardWithForm.module.css";

function CardDisplay({ displayData, setDisplayData }) {
  const updateIssuer = ({ issuer }) => {
    setDisplayData((prev) => ({ ...prev, issuer }));
  };
  return (
    <div className={classes.display}>
      <ReactCreditCard {...displayData} callback={updateIssuer} />
    </div>
  );
}

export default CardDisplay;
