import { Col, Row } from "antd";
import React from "react";
import CardWithForm from "../../components/CardWithForm";
import classes from "./NewCard.module.css";

function NewCard() {
  return (
    <Row justify="center">
      <Col sm={12} className={classes.container}>
        <CardWithForm />
      </Col>
    </Row>
  );
}

export default NewCard;
