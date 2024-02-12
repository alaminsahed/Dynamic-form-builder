/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsProps } from "antd";
import React from "react";
import { IElement } from "../../interface/element";
import RulesElements from "./components/Rules";
import MainFieldOptions from "./components/main";
import DynamicStyles from "./components/styles";

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
    console.log(value, key);

    const newFormElements = formElements.map((formElement) => {
      if (formElement.id === findSelectedElement.id) {
        const device = findSelectedElement.device || "any";

        if (
          key === "width" ||
          key === "height" ||
          key === "color" ||
          key === "marginTop" ||
          key === "marginBottom" ||
          key === "marginLeft" ||
          key === "marginRight" ||
          key === "color" ||
          key === "backgroundColor"
        ) {
          const newStyle = formElement.style ? [...formElement.style] : [];
          const existingStyleIndex = newStyle.findIndex(
            (item) => item.device === device
          );

          if (existingStyleIndex !== -1) {
            newStyle[existingStyleIndex] = {
              ...newStyle[existingStyleIndex],
              [key]: value,
            };
          } else {
            newStyle.push({ device: device, [key]: value });
          }

          return { ...formElement, style: newStyle };
        } else {
          console.log(key, value);
          console.log(formElement.id, findSelectedElement.id);
          const updatedFormElement = { ...formElement, [key]: value };
          return updatedFormElement;
        }
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
        <MainFieldOptions
          handleKeyChange={handleKeyChange}
          findSelectedElement={findSelectedElement}
        />
      ),
    },
    {
      key: "2",
      label: "Style",
      children: (
        <DynamicStyles
          handleKeyChange={handleKeyChange}
          findSelectedElement={findSelectedElement}
        />
      ),
    },
    {
      key: "3",
      label: "Rules",
      children: (
        <RulesElements
          handleKeyChange={handleKeyChange}
          findSelectedElement={findSelectedElement}
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
