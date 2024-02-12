import { Button, Card, Dropdown, Form, Input } from "antd";
import { useEffect, useState } from "react";

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

interface validationCard {
  required?: boolean;
  message?: string;
  limit?: string | number;
  type: string;
}

const RulesElements = ({ handleKeyChange, findSelectedElement }: any) => {
  const [validationCards, setValidationCards] = useState<validationCard[]>([]);

  const onClick = (e: any) => {
    const typeExists = validationCards.some((card) => card.type === e.key);
    if (!typeExists) {
      setValidationCards((prev) => [...prev, { required: true, type: e.key }]);
    }
  };

  console.log({ validationCards });

  const handleOptionChange = (
    index: number,
    type: string,
    value: string,
    field: string
  ) => {
    const updatedCards = [...validationCards];
    const cardToUpdate = updatedCards[index];
    if (cardToUpdate && cardToUpdate.type === type) {
      cardToUpdate[field] = value;
    }
    setValidationCards(updatedCards);
    handleKeyChange(updatedCards, "validations");
  };

  const handleRemoveOption = (index) => {
    setValidationCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards.splice(index, 1);
      return updatedCards;
    });
    handleKeyChange(validationCards, "validations");
  };

  useEffect(() => {
    if (findSelectedElement?.validations) {
      setValidationCards(findSelectedElement?.validations);
    } else {
      setValidationCards([]);
    }
  }, [findSelectedElement.id]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
          <Button type="primary" block>
            Add Validate Rules
          </Button>
        </Dropdown>
      </div>
      <div>
        {validationCards.map((validationCard, index) => (
          <Card
            key={index}
            style={{ marginTop: "10px" }}
            title={validationCard.type}
            extra={
              <Button
                type="link"
                danger
                onClick={() => handleRemoveOption(index)}
                style={{ marginBottom: "2px" }}
              >
                Remove
              </Button>
            }
          >
            <Form layout="vertical">
              {validationCard.type === "required" && (
                <Form.Item label="Message">
                  <Input
                    placeholder="Please input message"
                    onChange={(e) =>
                      handleOptionChange(
                        index,
                        validationCard.type,
                        e.target.value,
                        "message"
                      )
                    }
                    value={validationCard?.message}
                  />
                </Form.Item>
              )}
              {validationCard.type === "max" && (
                <>
                  <Form.Item label="Message">
                    <Input
                      placeholder="Please input message"
                      onChange={(e) =>
                        handleOptionChange(
                          index,
                          validationCard.type,
                          e.target.value,
                          "message"
                        )
                      }
                      value={validationCard?.message}
                    />
                  </Form.Item>
                  <Form.Item label="Limit">
                    <Input
                      placeholder="Please input message"
                      onChange={(e) =>
                        handleOptionChange(
                          index,
                          validationCard.type,
                          e.target.value,
                          "limit"
                        )
                      }
                      value={validationCard?.limit}
                    />
                  </Form.Item>
                </>
              )}
            </Form>
          </Card>
        ))}
      </div>
    </>
  );
};

export default RulesElements;
