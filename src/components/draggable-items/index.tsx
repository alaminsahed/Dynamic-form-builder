/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { useDrag } from "react-dnd";

const DraggableItem = ({ type, placeholder, className, style, icon }: any) => {
  const [, drag] = useDrag(
    () => ({
      type,
      item: { type, placeholder, className, style },
    }),
    [type]
  );

  return (
    <div
      ref={drag}
      style={{
        cursor: "move",
      }}
    >
      <Button
        style={{
          width: "100%",
        }}
        icon={icon}
      >
        {placeholder}
      </Button>
    </div>
  );
};

export { DraggableItem };
