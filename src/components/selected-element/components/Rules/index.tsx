import { Button, Card, Dropdown, Form, Input } from "antd";
import React, { useState } from "react";

const items = [
  {
    label: "Required",
    key: "required",
  },
  {
    label: "Length",
    key: "length",
  },
  {
    label: "Min",
    key: "min",
  },
  {
    label: "Max",
    key: "max",
  },
];

const RulesElements = ({ formElements, setFormElements }: any) => {
  const [cards, setCards] = useState([]);

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    const rules: any = [];

    Object.entries(values).forEach(([key, value]: any) => {
      if (key === "required") {
        rules.push({ type: "required", message: value.message });
      } else if (key === "length" || key === "min" || key === "max") {
        rules.push({
          type: key,
          message: value.message,
          limit: value.limit,
        });
      }
    });

    console.log({ rules });

    const updatedElements = formElements.map((element) => {
      if (element.active) {
        const existingValidations = element.validations || [];
        const isNewDataDifferent =
          JSON.stringify(existingValidations) !== JSON.stringify(rules);
        return isNewDataDifferent
          ? { ...element, validations: rules }
          : element;
      }
      return element;
    });

    console.log({ updatedElements });

    setFormElements(updatedElements);
  };

  const onClick = ({ key }) => {
    setCards((prev) => [
      ...prev,
      {
        name: key,
      },
    ]);
  };
  console.log({ cards });
  return (
    <Form onFinish={onFinish}>
      <div>
        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
          <Button block>Add Validate Rules</Button>
        </Dropdown>
        {cards.map((card, index) => (
          <Card key={index} style={{ margin: "10px" }} title={card.name}>
            {card.name === "min" || card.name === "max" ? (
              <>
                <Form.Item name={[card.name, "message"]} label="Message">
                  <Input />
                </Form.Item>
                <Form.Item
                  name={[card.name, "limit"]}
                  label="Limit"
                  rules={[{ required: true }]}
                >
                  <Input type="number" />
                </Form.Item>
              </>
            ) : (
              <Form.Item name={[card.name, "message"]} label="Message">
                <Input />
              </Form.Item>
            )}
          </Card>
        ))}
        <br />
        <br />
        <div>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default RulesElements;
