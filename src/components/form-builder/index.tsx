/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Input, message } from "antd";
import _ from "lodash";
import React from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DraggableFields } from "..";
import { IElement } from "../../interface/element";

interface FormBuilderProps {
  formElements: IElement[];
  setFormElements: React.Dispatch<React.SetStateAction<IElement[]>>;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  formElements,
  setFormElements,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "text",
    drop: (item: {
      type:
        | "text"
        | "radio"
        | "checkbox"
        | "dropdown"
        | "textarea"
        | "datepicker";
      id: number;
    }) => handleDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleDrop = (item: {
    type:
      | "text"
      | "radio"
      | "checkbox"
      | "dropdown"
      | "textarea"
      | "datepicker";
    id: number;
  }) => {
    const id = Number(_.uniqueId());
    const newIndex = formElements.length;
    setFormElements([
      ...formElements,
      {
        ...item,
        id,
        key: item.type + "_" + id,
        label: item.type === "text" ? "Input" : "",
        size: "middle",
        index: newIndex,
      },
    ]);
  };

  const moveElement = (dragIndex: number, hoverIndex: number) => {
    const draggedElement = formElements[dragIndex];
    const updatedFormElements = [...formElements];

    updatedFormElements.splice(dragIndex, 1);
    updatedFormElements.splice(hoverIndex, 0, draggedElement);

    updatedFormElements.forEach((element, index) => {
      element.index = index;
    });

    setFormElements(updatedFormElements);
  };

  const validateInput = (value: any, validations: any) => {
    if (
      validations?.some((validation) => {
        if (validation.type === "min" && value < validation.limit) {
          message.error(validation.message);
          return true;
        }
        if (validation.type === "max" && value > validation.limit) {
          message.error(`Maximum value is ${validation.limit}`);
          return true;
        }

        if (validation.type === "required" && !value) {
          message.error(validation.message);
          return true;
        }

        return false;
      })
    ) {
      return false;
    }
    return true;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        ref={drop}
        style={{
          height: "calc(100vh - 200px)",
        }}
      >
        {formElements.map((element) => (
          <DraggableFields
            key={element.id}
            id={element.id}
            index={element.index}
            moveElement={moveElement}
          >
            <div
              key={element.id}
              style={{
                border: element.active ? "2px solid blue" : "none",
                padding: "10px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                const newFormElements = formElements.map((formElement) => {
                  if (formElement.id === element.id) {
                    return { ...formElement, active: true };
                  }
                  return { ...formElement, active: false };
                });
                setFormElements(newFormElements);
              }}
            >
              {element.type === "text" ? (
                <Form.Item
                  key={element.id}
                  label={element.label}
                  rules={element?.validations?.map((validation) => ({
                    [validation.type]: [
                      {
                        validator: (_, value) =>
                          validateInput(value, element.validations),
                      },
                    ],
                  }))}
                >
                  <Input
                    placeholder={element.placeholder || ""}
                    style={element.style}
                    size={element.size}
                    onBlur={(e) =>
                      validateInput(e.target.value, element.validations)
                    }
                  />
                </Form.Item>
              ) : null}
            </div>
          </DraggableFields>
        ))}
        {isOver && canDrop && (
          <div style={{ height: "30px", backgroundColor: "yellow" }}></div>
        )}
      </div>
    </DndProvider>
  );
};

export { FormBuilder };
