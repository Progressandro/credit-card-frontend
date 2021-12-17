import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import { cardRegex, nameRegex } from "../../util/cardValidations";
import moment from "moment";

const initialValues = {
  number: "",
  name: "",
  expiry: "",
  cvc: "",
  issuer: "",
  focused: ""
};

function CardForm({ displayData, setDisplayData }) {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    const { month, year, ...rest } = data;
    const body = {
      ...rest,
      expiry: `${moment(month).format("MM")}/${moment(year).format("YY")}`,
      ending: data.number.slice(data.number.length - 4),
      issuer: displayData.issuer
    };
    try {
      const response = await fetch(
        "https://combo-test.vercel.app/api/addCard",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(body)
        }
      );
      const dataObj = await response.json();
      console.log({ dataObj });
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  const handleChange = (changed, all) => {
    setDisplayData((prev) => ({
      ...prev,
      ...all,
      expiry: `${moment(all.month).format("MM")}/${moment(all.year).format(
        "YY"
      )}`,
      focused: Object.keys(changed)?.[0] || null
    }));
  };
  return (
    <Form
      name="add-card"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={handleSubmit}
      onValuesChange={handleChange}
      initialValues={initialValues}
    >
      <Form.Item
        label="Card Number"
        name="number"
        rules={[
          { required: true, message: "Please add your credit card number" },
          {
            pattern: cardRegex,
            message: "Only numbers"
          },
          {
            min: 16,
            message: "Card number must be 16 digit long."
          }
        ]}
      >
        <Input maxLength={16} />
      </Form.Item>
      <Form.Item
        label="Card Name"
        name="name"
        rules={[
          { required: true, message: "This field is required." },
          {
            pattern: nameRegex,
            message: "Only letters and hyphens"
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Row>
        <Col md={8}>
          <Form.Item
            label="Month"
            name="month"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "This field is required." }]}
          >
            <DatePicker
              mode="month"
              picker="month"
              format="MM"
              style={{ width: "90%" }}
              dropdownClassName="hideYear"
            />
          </Form.Item>
        </Col>
        <Col md={8}>
          <Form.Item
            label="Year"
            name="year"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: "This field is required." }]}
          >
            <DatePicker
              mode="year"
              picker="year"
              format="YY"
              style={{ width: "90%" }}
            />
          </Form.Item>
        </Col>
        <Col md={8}>
          <Form.Item
            labelCol={{ span: 24 }}
            label="CVV"
            name="cvc"
            rules={[
              { required: true, message: "This field is required." },
              {
                min: 3,
                message: "CVV must be 3 digits long."
              }
            ]}
          >
            <Input maxLength={3} type="password" style={{ width: "90%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Submit
        </Button>
      </Row>
    </Form>
  );
}

export default CardForm;
