import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import CardDisplay from "./Display";
import CardForm from "./Form";

function CardWithForm() {
  const [displayData, setDisplayData] = useState({
    number: "",
    name: "",
    expiry: "01/01",
    cvc: "",
    issuer: "",
    focused: ""
  });

  useEffect(() => {
    console.log(displayData);
  }, [displayData]);
  return (
    <Row justify="center" style={{ marginTop: 40 }}>
      <Col md={24}>
        <Row justify="center">
          <CardDisplay
            displayData={displayData}
            setDisplayData={setDisplayData}
          />
        </Row>
      </Col>
      <Col md={24}>
        <CardForm displayData={displayData} setDisplayData={setDisplayData} />
      </Col>
    </Row>
  );
}

export default CardWithForm;
