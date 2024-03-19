import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { IElement, IElementBtnOptions } from '../../interface/element';

interface FormPreviewProps {
  formElements: IElement[] | IElementBtnOptions[];
}

const FormPreview: React.FC<FormPreviewProps> = ({ formElements }) => {
  const [formErrors, setFormErrors] = useState({});

  const validateInput = (value, validations, key) => {
    let errorMessage = '';
    validations?.forEach((validation) => {
      if (validation.type === 'required' && !value) {
        errorMessage = validation.message;
      }
      if (validation.type === 'max' && Number(value) > validation.limit) {
        errorMessage = validation.message;
      }
      setFormErrors({ ...formErrors, [key]: errorMessage });
    });
  };

  console.log({ formErrors });
  return (
    <Form layout="vertical">
      {formElements.map((element, index) => (
        <React.Fragment key={index}>
          {element.type === 'text' && (
            <Form.Item label={element.label}>
              <Input
                placeholder={element.placeholder || ''}
                size={element.size}
                onBlur={(e) =>
                  validateInput(
                    e.target.value,
                    element.validations,
                    element.key
                  )
                }
                style={
                  element.style && element.style.length > 0
                    ? element.style.find(
                        (s) => s.device === 'any' || s.device === 'desktop'
                      )
                    : {}
                }
              />
              {formErrors[element.key] && (
                <div style={{ color: 'red' }}>{formErrors[element.key]}</div>
              )}
            </Form.Item>
          )}
          {element.type === 'dropdown' && (
            <Form.Item key={index} label={element.label}>
              <Select
                options={element.dropdownOptions || []}
                style={element.style}
              />
            </Form.Item>
          )}
          {element.type === 'checkbox' && (
            <Form.Item key={index} label={element.label}>
              <Checkbox.Group options={element.checkboxOptions || []} />
            </Form.Item>
          )}
          {element.type === 'button' && (
            <Form.Item key={index}>
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
        </React.Fragment>
      ))}
    </Form>
  );
};

export default FormPreview;
