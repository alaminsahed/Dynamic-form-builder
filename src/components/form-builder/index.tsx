import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from 'antd';
import _ from 'lodash';
import React from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DeleteOutlined } from '@ant-design/icons';

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
      return 'text';
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

  const inputElementAndType = (element) => {
    if (element.inputType === 'password' && element.passwordMask) {
      return (
        <Input.Password
          placeholder={element.placeholder || ''}
          size={element.size}
          onBlur={(e) => validateInput(e.target.value, element.validations)}
          style={
            element.style && element.style.length > 0
              ? element.style.find(
                  (s) => s.device === 'any' || s.device === 'desktop'
                )
              : {}
          }
          disabled={element.disabled}
        />
      );
    } else if (element.inputType === 'number') {
      return (
        <InputNumber
          placeholder={element.placeholder || ''}
          size={element.size}
          onBlur={(e) => validateInput(e.target.value, element.validations)}
          style={
            element.style && element.style.length > 0
              ? element.style.find(
                  (s) => s.device === 'any' || s.device === 'desktop'
                )
              : {
                  width: '100%',
                }
          }
          type="number"
          disabled={element.disabled}
        />
      );
    } else if (element.inputType === 'search') {
      return (
        <Input.Search
          placeholder={element.placeholder || ''}
          size={element.size}
          onBlur={(e) => validateInput(e.target.value, element.validations)}
          style={
            element.style && element.style.length > 0
              ? element.style.find(
                  (s) => s.device === 'any' || s.device === 'desktop'
                )
              : {}
          }
          disabled={element.disabled}
        />
      );
    } else if (element.inputType === 'url') {
      return (
        <Input
          addonBefore="https://"
          placeholder={element.placeholder || ''}
          size={element.size}
          onBlur={(e) => validateInput(e.target.value, element.validations)}
          style={
            element.style && element.style.length > 0
              ? element.style.find(
                  (s) => s.device === 'any' || s.device === 'desktop'
                )
              : {}
          }
          disabled={element.disabled}
        />
      );
    } else {
      return (
        <Input
          type={element.inputType === 'password' ? 'password' : 'text'}
          placeholder={element.placeholder || ''}
          size={element.size}
          onBlur={(e) => validateInput(e.target.value, element.validations)}
          style={
            element.style && element.style.length > 0
              ? element.style.find(
                  (s) => s.device === 'any' || s.device === 'desktop'
                )
              : {}
          }
          disabled={element.disabled}
        />
      );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        ref={drop}
        style={{
          height: 'calc(100vh - 200px)',
        }}
        onClick={(e) => {
          e.stopPropagation();
          const newFormElements = formElements.map((formElement) => {
            return { ...formElement, active: false };
          });
          setFormElements(newFormElements);
        }}
      >
        {formElements.length > 0 ? (
          formElements.map((element) => (
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
                  padding: element.active ? '10px' : '5px',
                  borderRadius: '5px',
                  position: 'relative',
                  transition: '200ms all ease-in-out',
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
                      {inputElementAndType(element)}
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
                      <Checkbox.Group
                        options={element?.checkboxOptions || []}
                      />
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
                {element.active && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -40,
                      right: 0,
                    }}
                  >
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        const newFormElements = formElements.filter(
                          (formElement) => formElement.id !== element.id
                        );
                        setFormElements(newFormElements);
                      }}
                    />
                  </div>
                )}
              </div>
            </DraggableFields>
          ))
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h2>No Elements</h2>
            <p>Drag and drop elements here</p>
          </div>
        )}
        {isOver && canDrop && (
          <div style={{ height: '30px', backgroundColor: 'yellow' }}></div>
        )}
      </div>
    </DndProvider>
  );
};

export { FormBuilder };
