import { Row, Col, Button } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactCreditCard from "react-credit-cards";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import classes from "./MainView.module.css";

const sortByField = (a, b, field, asc = true) => {
  if (a[field] < b[field]) {
    return asc ? 1 : -1;
  }
  if (a[field] > b[field]) {
    return asc ? -1 : 1;
  }
  return 0;
};

const sortCards = (a, b) => {
  const { name: nameA, expiry: expiryA } = a;
  const { name: nameB, expiry: expiryB } = b;
  const [monthA, yearA] = expiryA.split("/");
  const [monthB, yearB] = expiryB.split("/");
  const dateA = moment({ month: monthA, year: yearA }).unix();
  const dateB = moment({ month: monthB, year: yearB }).unix();
  console.log({ dateA, dateB });

  if (nameA === nameB) {
    return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
  } else {
    return nameA < nameB ? -1 : 1;
  }
};

function MainView() {
  const [cards, setCards] = useState(null);
  const [lastAdded, setLastAdded] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://combo-test.vercel.app/api/getCards"
      );
      const data = await response.json();
      if (data.length) {
        setLastAdded(data.sort((a, b) => sortByField(a, b, "added"))[0]);
        const sortedCards = data.sort(sortCards);
        setCards(sortedCards);
      } else {
        setCards([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);
  return (
    <Row justify="center">
      <Col span={24}>
        <Row justify="center">
          <h1>Your Cards</h1>
        </Row>
      </Col>
      <Col span={24}>
        <Row justify="center">
          <Link to="/add">
            <Button type="primary">Add Card</Button>
          </Link>
        </Row>
      </Col>
      {!loading || cards?.length ? (
        <Col span={24}>
          <Row justify="center" gutter={20} style={{ marginTop: 20 }}>
            {cards?.length ? (
              cards.map((c) => (
                <Col
                  style={{ marginBottom: 20, padding: 20 }}
                  className={
                    lastAdded?.number === c.number
                      ? classes.lastAdded
                      : undefined
                  }
                >
                  <ReactCreditCard
                    name={c.name}
                    number={`************${c.ending}`}
                    expiry={c.expiry}
                    cvc={c.cvc}
                    issuer={c.issuer}
                    preview
                  />
                </Col>
              ))
            ) : (
              <Row justify="center">
                <Col>
                  <span>No cards added</span>
                </Col>
              </Row>
            )}
          </Row>
        </Col>
      ) : (
        <Row justify="center" style={{ marginTop: 20 }}>
          <Loader type="Circles" color="white" />
        </Row>
      )}
    </Row>
  );
}

export default MainView;
