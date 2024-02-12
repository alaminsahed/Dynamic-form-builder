import { Button, Checkbox, Input, Select, Space } from "antd";
import { IElement, IElementBtnOptions } from "../../../../interface/element";
import { useEffect, useState } from "react";

interface MainFieldOptionsProps {
  handleKeyChange: (value: any, key: string) => void;
  findSelectedElement: IElementBtnOptions | IElement;
}

const MainFieldOptions: React.FC<MainFieldOptionsProps> = ({
  handleKeyChange,
  findSelectedElement,
}) => {
  const [options, setOptions] = useState<{ key: string; value: string }[]>([]);

  const handleAddOption = () => {
    setOptions([...options, { key: "", value: "" }]);
  };

  const handleOptionChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
    handleKeyChange(updatedOptions, "dropdownOptions");
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
    handleKeyChange(updatedOptions, "dropdownOptions");
  };

  useEffect(() => {
    if (findSelectedElement.dropdownOptions) {
      setOptions(findSelectedElement.dropdownOptions);
    } else {
      setOptions([]);
    }
  }, [findSelectedElement.id]);

  return (
    <>
      <label htmlFor="key" style={{ display: "block", marginBottom: "0.5rem" }}>
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
      {findSelectedElement.type === "text" && (
        <>
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
      )}

      {findSelectedElement.type === "button" && (
        <>
          <label
            htmlFor="style"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Appearance
          </label>
          <Select
            defaultValue="primary"
            onChange={(e) => handleKeyChange(e, "appearance")}
            value={(findSelectedElement as IElementBtnOptions).appearance}
            options={[
              {
                label: "Primary",
                value: "primary",
              },
              {
                label: "Dashed",
                value: "dashed",
              },
              {
                label: "Link",
                value: "link",
              },
              {
                label: "Text",
                value: "text",
              },
              {
                label: "Default",
                value: "default",
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
            href
          </label>
          <Input
            placeholder="Enter link"
            onChange={(e) => handleKeyChange(e.target.value, "href")}
            value={(findSelectedElement as IElementBtnOptions).href}
          />
          <label
            htmlFor="style"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            htmlType
          </label>
          <Select
            defaultValue="button"
            onChange={(e) => handleKeyChange(e, "htmlType")}
            value={(findSelectedElement as IElementBtnOptions).htmlType}
            options={[
              {
                label: "Button",
                value: "button",
              },
              {
                label: "Submit",
                value: "submit",
              },
              {
                label: "Reset",
                value: "reset",
              },
            ]}
            style={{
              width: "100%",
              marginBottom: "0.5rem",
            }}
          />
          <label
            htmlFor="style"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Shape
          </label>
          <Select
            defaultValue="default"
            onChange={(e) => handleKeyChange(e, "shape")}
            value={(findSelectedElement as IElementBtnOptions).shape}
            options={[
              {
                label: "Circle",
                value: "circle",
              },
              {
                label: "Round",
                value: "round",
              },
              {
                label: "Default",
                value: "default",
              },
            ]}
            style={{
              width: "100%",
              marginBottom: "0.5rem",
            }}
          />

          <Checkbox
            checked={(findSelectedElement as IElementBtnOptions).ghost}
            onChange={(e) => handleKeyChange(e.target.checked, "ghost")}
          >
            Ghost
          </Checkbox>
          <Checkbox
            checked={(findSelectedElement as IElementBtnOptions).danger}
            onChange={(e) => handleKeyChange(e.target.checked, "danger")}
          >
            {" "}
            Danger{" "}
          </Checkbox>
          <Checkbox
            checked={(findSelectedElement as IElementBtnOptions).disabled}
            onChange={(e) => handleKeyChange(e.target.checked, "disabled")}
          >
            {" "}
            Disabled{" "}
          </Checkbox>
          <Checkbox
            checked={(findSelectedElement as IElementBtnOptions).block}
            onChange={(e) => handleKeyChange(e.target.checked, "block")}
          >
            {" "}
            Block{" "}
          </Checkbox>
        </>
      )}
      {findSelectedElement.type === "dropdown" && (
        <>
          <label
            htmlFor="options"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Options
          </label>
          {options.map((option, index) => (
            <div
              key={index}
              style={{
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Space>
                <Input
                  placeholder="Key"
                  value={option.key}
                  onChange={(e) =>
                    handleOptionChange(index, "key", e.target.value)
                  }
                />
                <Input
                  placeholder="Value"
                  value={option.value}
                  onChange={(e) =>
                    handleOptionChange(index, "value", e.target.value)
                  }
                />
                <Button
                  type="text"
                  danger
                  onClick={() => handleRemoveOption(index)}
                >
                  Remove
                </Button>
              </Space>
            </div>
          ))}
          <Button type="primary" onClick={handleAddOption}>
            Add Option
          </Button>
        </>
      )}
    </>
  );
};

export default MainFieldOptions;
