/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Select, Tabs, TabsProps } from "antd";
import React from "react";
import { IElement } from "../../interface/element";
import RulesElements from "./components/Rules";

interface SelectedElementProps {
  formElements: IElement[];
  setFormElements: React.Dispatch<React.SetStateAction<IElement[]>>;
}

const SelectedElement: React.FC<SelectedElementProps> = ({
  formElements,
  setFormElements,
}) => {
  const findSelectedElement = formElements.find((element) => element.active);

  const handleKeyChange = (value: any, key: string) => {
    if (!findSelectedElement) return;
    const newFormElements = formElements.map((formElement) => {
      if (formElement.id === findSelectedElement.id) {
        return { ...formElement, [key]: value };
      }
      return formElement;
    });
    setFormElements(newFormElements);
  };

  if (!findSelectedElement)
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl">No Element Selected</h2>
        <p className="text-gray-500">Click on an element to select it</p>
      </div>
    );

  console.log({ formElements });

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Main",
      children: (
        <>
          <label
            htmlFor="key"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Key{" "}
          </label>
          <Input
            placeholder="Enter Key"
            onChange={(e) => handleKeyChange(e.target.value, "key")}
            value={findSelectedElement.key}
          />
          <label
            htmlFor="label"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Label
          </label>
          <Input
            placeholder="Enter Label"
            onChange={(e) => handleKeyChange(e.target.value, "label")}
            value={findSelectedElement.label}
          />
          <label
            htmlFor="placeholder"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Placeholder
          </label>
          <Input
            placeholder="Enter Placeholder"
            onChange={(e) => handleKeyChange(e.target.value, "placeholder")}
            value={findSelectedElement.placeholder}
          />
          <label
            htmlFor="style"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Size
          </label>
          <Select
            defaultValue="medium"
            onChange={(e) => handleKeyChange(e, "size")}
            value={findSelectedElement.size}
            options={[
              {
                label: "Small",
                value: "small",
              },
              {
                label: "Middle",
                value: "middle",
              },
              {
                label: "Large",
                value: "large",
              },
            ]}
            style={{
              width: "100%",
            }}
          />
          <label
            htmlFor="style"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Value
          </label>
          <Input
            placeholder="Enter Value"
            onChange={(e) => handleKeyChange(e.target.value, "value")}
            value={findSelectedElement.value}
          />
        </>
      ),
    },
    {
      key: "2",
      label: "Style",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Rules",
      children: (
        <RulesElements
          formElements={formElements}
          setFormElements={setFormElements}
        />
      ),
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export { SelectedElement };
