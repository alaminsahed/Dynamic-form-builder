/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import _ from 'lodash';
import React from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableFields } from '../draggable-fields';
import {
  FormType,
  IElement,
  IElementBtnOptions,
} from '../../interface/element';

interface FormBuilderProps {
  formElements: IElement[] | IElementBtnOptions[];
  setFormElements: React.Dispatch<React.SetStateAction<IElement[]>>;
}

const formLabel = (element) => {
  switch (element.type) {
    case 'text':
      return 'Input';
    case 'button':
      return 'Button';
    case 'dropdown':
      return 'Dropdown';
    case 'checkbox':
      return 'Checkbox';
    default:
      return '';
  }
};

const FormBuilder: React.FC<FormBuilderProps> = ({
  formElements,
  setFormElements,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ['text', 'button', 'dropdown', 'checkbox'],
    drop: (item: { type: FormType; id: number }) => handleDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleDrop = (item: { type: FormType; id: number }) => {
    const id = Number(_.uniqueId());
    const newIndex = formElements.length;
    const newElement: any = {
      ...item,
      id,
      key: item.type + '_' + id,
      label: formLabel(item),
      size: 'middle',
      index: newIndex,
    };

    if (item.type === 'checkbox') {
      newElement.checkboxOptions = [
        { label: 'Option 1', value: 'Option 1' },
        { label: 'Option 2', value: 'Option 2' },
        { label: 'Option 3', value: 'Option 3' },
      ];
    }
    if (item.type === 'dropdown') {
      newElement.dropdownOptions = [
        { label: 'Option 1', value: 'Option 1' },
        { label: 'Option 2', value: 'Option 2' },
        { label: 'Option 3', value: 'Option 3' },
      ];
    }

    setFormElements([...formElements, newElement]);
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
        if (validation.type === 'min' && value < validation.limit) {
          message.error(validation.message);
          return true;
        }
        if (validation.type === 'max' && value > validation.limit) {
          message.error(validation.message);
          return true;
        }

        if (validation.type === 'required' && !value) {
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
          height: 'calc(100vh - 200px)',
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
                border: element.active ? '2px solid blue' : 'none',
                padding: '10px',
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
              <Form layout="vertical">
                {element.type === 'text' && (
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
                      placeholder={element.placeholder || ''}
                      size={element.size}
                      onBlur={(e) =>
                        validateInput(e.target.value, element.validations)
                      }
                      style={
                        element.style && element.style.length > 0
                          ? element.style.find(
                              (s) =>
                                s.device === 'any' || s.device === 'desktop'
                            )
                          : {}
                      }
                    />
                  </Form.Item>
                )}
                {element.type === 'dropdown' && (
                  <Form.Item key={element.id} label={element.label}>
                    <Select
                      placeholder={element.placeholder || ''}
                      options={element.dropdownOptions || []}
                      style={
                        element.style && element.style.length > 0
                          ? element.style.find(
                              (s) =>
                                s.device === 'any' || s.device === 'desktop'
                            )
                          : {}
                      }
                    />
                  </Form.Item>
                )}
                {element.type === 'checkbox' && (
                  <Form.Item key={element.id} label={element.label}>
                    <Checkbox.Group options={element?.checkboxOptions || []} />
                  </Form.Item>
                )}
                {element.type === 'button' && (
                  <Form.Item key={element.id}>
                    <Button
                      size={element.size}
                      style={element.style}
                      danger={element.danger}
                      block={element.block}
                      htmlType={element.htmlType}
                      disabled={element.disabled}
                      shape={element.shape}
                      type={element.appearance}
                    >
                      {element.label}
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </div>
          </DraggableFields>
        ))}
        {isOver && canDrop && (
          <div style={{ height: '30px', backgroundColor: 'yellow' }}></div>
        )}
      </div>
    </DndProvider>
  );
};

export { FormBuilder };
