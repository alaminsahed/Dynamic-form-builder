import { useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

interface DraggableFieldsProps {
  id: number;
  index: number;
  moveElement: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

const DraggableFields: React.FC<DraggableFieldsProps> = ({
  id,
  index,
  moveElement,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'FORM_ELEMENT',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: 'FORM_ELEMENT',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (
      item: { id: number; index: number },
      monitor: DropTargetMonitor
    ) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveElement(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));
  const opacity = isDragging ? 0 : 1;
  return (
    <div
      ref={ref}
      style={{
        cursor: 'move',
        opacity,
      }}
      data-handler-id={handlerId}
    >
      {children}
    </div>
  );
};

export { DraggableFields };
