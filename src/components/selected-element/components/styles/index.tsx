import React, { useEffect, useState } from "react";
import { IElement, IElementBtnOptions } from "../../../../interface/element";
import { ColorPicker, InputNumber, Select } from "antd";

interface DynamicStylesProps {
  handleKeyChange: (value: any, key: string) => void;
  findSelectedElement: IElementBtnOptions | IElement;
}

interface DimensionState {
  type: string | undefined;
  value: number | undefined;
}

const DynamicStyles: React.FC<DynamicStylesProps> = ({
  handleKeyChange,
  findSelectedElement,
}) => {
  const [width, setWidth] = useState<DimensionState>({
    type: undefined,
    value: undefined,
  });
  const [height, setHeight] = useState<DimensionState>({
    type: undefined,
    value: undefined,
  });

  const [margins, setMargins] = useState({
    marginTop: { type: undefined, value: undefined },
    marginBottom: { type: undefined, value: undefined },
    marginLeft: { type: undefined, value: undefined },
    marginRight: { type: undefined, value: undefined },
  });

  const handleDimensionChange = (
    dimension: string,
    value: number | undefined,
    type: string | undefined
  ) => {
    if (dimension === "width") {
      setWidth({ value, type });
    } else if (dimension === "height") {
      setHeight({ value, type });
    } else {
      setMargins((prevMargins) => ({
        ...prevMargins,
        [dimension]: { type, value },
      }));
    }
    console.log({ dimension, value, type });
    console.log(`${value}${type}`);
    handleKeyChange(`${value}${type}`, dimension);
  };

  useEffect(() => {
    const deviceStyle =
      findSelectedElement?.style?.find(
        (style) => style.device === findSelectedElement.device
      ) || {};

    if (deviceStyle) {
      if (deviceStyle.width) {
        const [value, type] = deviceStyle.width.split(/([a-zA-Z]+)/);
        setWidth({ value: parseFloat(value), type });
      } else {
        setWidth({ type: undefined, value: undefined });
      }

      if (deviceStyle.height) {
        const [value, type] = deviceStyle.height.split(/([a-zA-Z]+)/);
        setHeight({ value: parseFloat(value), type });
      } else {
        setHeight({ type: undefined, value: undefined });
      }

      if (deviceStyle.margin) {
        const [marginTop, marginTopType] =
          deviceStyle.marginTop.split(/([a-zA-Z]+)/);
        const [marginBottom, marginBottomType] =
          deviceStyle.marginBottom.split(/([a-zA-Z]+)/);
        const [marginLeft, marginLeftType] =
          deviceStyle.marginLeft.split(/([a-zA-Z]+)/);
        const [marginRight, marginRightType] =
          deviceStyle.marginRight.split(/([a-zA-Z]+)/);
        setMargins({
          marginTop: { value: parseFloat(marginTop), type: marginTopType },
          marginBottom: {
            value: parseFloat(marginBottom),
            type: marginBottomType,
          },
          marginLeft: { value: parseFloat(marginLeft), type: marginLeftType },
          marginRight: {
            value: parseFloat(marginRight),
            type: marginRightType,
          },
        });
      } else {
        setMargins({
          marginTop: { type: undefined, value: undefined },
          marginBottom: { type: undefined, value: undefined },
          marginLeft: { type: undefined, value: undefined },
          marginRight: { type: undefined, value: undefined },
        });
      }
    }
  }, [findSelectedElement.device]);

  return (
    <>
      <label
        htmlFor="style"
        style={{ display: "block", marginBottom: "0.5rem" }}
      >
        For device
      </label>
      <Select
        defaultValue="any"
        onChange={(e) => handleKeyChange(e, "device")}
        value={findSelectedElement.device}
        options={[
          {
            label: "Any",
            value: "any",
          },
          {
            label: "Desktop",
            value: "desktop",
          },
          {
            label: "Tablet",
            value: "tablet",
          },
          {
            label: "Mobile",
            value: "mobile",
          },
        ]}
        style={{
          width: "100%",
        }}
      />
      <label
        htmlFor="width"
        style={{ display: "block", marginBottom: "0.5rem" }}
      >
        Width
      </label>

      {width.type && (
        <InputNumber
          placeholder={`Enter Width in ${width.type}`}
          onChange={(value) =>
            handleDimensionChange("width", value, width.type)
          }
          value={width.value}
          style={{ width: "40%", marginRight: "3px" }}
        />
      )}

      <Select
        placeholder="Select"
        onChange={(value) => handleDimensionChange("width", width.value, value)}
        value={width.type}
        options={[
          { label: "%", value: "%" },
          { label: "px", value: "px" },
          { label: "rem", value: "rem" },
          { label: "em", value: "em" },
        ]}
        style={{ width: "40%" }}
      />

      <label
        htmlFor="height"
        style={{ display: "block", marginBottom: "0.5rem", marginTop: "1rem" }}
      >
        Height
      </label>
      {height.type && (
        <InputNumber
          placeholder={`Enter Height in ${height.type}`}
          onChange={(value) =>
            handleDimensionChange("height", value, height.type)
          }
          value={height.value}
          style={{ width: "40%", marginRight: "3px" }}
        />
      )}

      <Select
        placeholder="Select"
        onChange={(value) =>
          handleDimensionChange("height", height.value, value)
        }
        value={height.type}
        options={[
          { label: "%", value: "%" },
          { label: "px", value: "px" },
          { label: "rem", value: "rem" },
          { label: "em", value: "em" },
        ]}
        style={{ width: "40%", marginRight: "5px" }}
      />
      <label
        htmlFor="marginTop"
        style={{ display: "block", marginBottom: "0.5rem", marginTop: "1rem" }}
      >
        Margin Top
      </label>
      {margins.marginTop.type && (
        <InputNumber
          placeholder={`Enter Margin Top`}
          onChange={(value) =>
            handleDimensionChange("marginTop", value, margins.marginTop.type)
          }
          value={margins.marginTop.value}
          style={{ width: "40%", marginRight: "5px" }}
        />
      )}
      <Select
        placeholder="Select"
        onChange={(value) =>
          handleDimensionChange("marginTop", margins.marginTop.value, value)
        }
        value={margins.marginTop.type}
        options={[
          { label: "px", value: "px" },
          { label: "rem", value: "rem" },
          { label: "em", value: "em" },
        ]}
        style={{ width: "40%" }}
      />
      <label
        htmlFor="marginTop"
        style={{ display: "block", marginBottom: "0.5rem", marginTop: "1rem" }}
      >
        Margin Bottom
      </label>
      {margins.marginBottom.type && (
        <InputNumber
          placeholder={`Enter Margin Top`}
          onChange={(value) =>
            handleDimensionChange("marginTop", value, margins.marginBottom.type)
          }
          value={margins.marginBottom.value}
          style={{ width: "40%", marginRight: "5px" }}
        />
      )}
      <Select
        placeholder="Select"
        onChange={(value) =>
          handleDimensionChange(
            "marginBottom",
            margins.marginBottom.value,
            value
          )
        }
        value={margins.marginBottom.type}
        options={[
          { label: "px", value: "px" },
          { label: "rem", value: "rem" },
          { label: "em", value: "em" },
        ]}
        style={{ width: "40%" }}
      />
      <label
        htmlFor="marginTop"
        style={{ display: "block", marginBottom: "0.5rem", marginTop: "1rem" }}
      >
        Margin Left
      </label>
      {margins.marginLeft.type && (
        <InputNumber
          placeholder={`Enter Margin Top`}
          onChange={(value) =>
            handleDimensionChange("marginTop", value, margins.marginLeft.type)
          }
          value={margins.marginLeft.value}
          style={{ width: "40%", marginRight: "5px" }}
        />
      )}
      <Select
        placeholder="Select"
        onChange={(value) =>
          handleDimensionChange("marginTop", margins.marginLeft.value, value)
        }
        value={margins.marginLeft.type}
        options={[
          { label: "px", value: "px" },
          { label: "rem", value: "rem" },
          { label: "em", value: "em" },
        ]}
        style={{ width: "40%" }}
      />
      <label
        htmlFor="marginTop"
        style={{ display: "block", marginBottom: "0.5rem", marginTop: "1rem" }}
      >
        Margin Right
      </label>
      {margins.marginRight.type && (
        <InputNumber
          placeholder={`Enter Margin Top`}
          onChange={(value) =>
            handleDimensionChange("marginTop", value, margins.marginRight.type)
          }
          value={margins.marginRight.value}
          style={{ width: "40%", marginRight: "5px" }}
        />
      )}
      <Select
        placeholder="Select"
        onChange={(value) =>
          handleDimensionChange("marginTop", margins.marginRight.value, value)
        }
        value={margins.marginRight.type}
        options={[
          { label: "px", value: "px" },
          { label: "rem", value: "rem" },
          { label: "em", value: "em" },
        ]}
        style={{ width: "40%" }}
      />
      <label
        htmlFor="color"
        style={{ display: "block", marginBottom: "0.5rem", marginTop: "1rem" }}
      >
        Color
      </label>
      <ColorPicker
        defaultValue="#000000"
        showText
        onChangeComplete={(value) =>
          handleKeyChange(value.toHexString(), "color")
        }
        style={{ width: "100%" }}
      />

      <label
        htmlFor="bgColor"
        style={{ display: "block", marginBottom: "0.5rem", marginTop: "1rem" }}
      >
        Background Color
      </label>
      <ColorPicker
        defaultValue="#ffffff"
        showText
        onChangeComplete={(value) =>
          handleKeyChange(value.toHexString(), "backgroundColor")
        }
        style={{ width: "100%" }}
      />
    </>
  );
};

export default DynamicStyles;
