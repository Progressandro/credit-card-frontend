import moment from "moment";
import React from "react";
import ReactCreditCard from "react-credit-cards";

const exampleCards = [
  {
    name: "Testing Card",
    number: "5555123412341234",
    cvc: 882,
    expiry: "01/01",
    focus: true
  },
  {
    name: "Testing Card",
    number: "4111123412341234",
    cvc: 882,
    expiry: "01/01",
    focus: false
  }
];
function MainView() {
  return exampleCards.map((c) => (
    <ReactCreditCard
      name={c.name}
      number={c.number}
      expiry={c.exp}
      cvc={c.cvc}
      focused={c.focus}
    />
  ));
}

export default MainView;
