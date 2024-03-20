import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from 'antd';
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

  const inputElementAndType = (element) => {
    if (element.inputType === 'password' && element.passwordMask) {
      return (
        <Input.Password
          placeholder={element.placeholder || ''}
          size={element.size}
          onBlur={(e) =>
            validateInput(e.target.value, element.validations, element.key)
          }
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
          onBlur={(e) =>
            validateInput(e.target.value, element.validations, element.key)
          }
          style={
            element.style && element.style.length > 0
              ? element.style.find(
                  (s) => s.device === 'any' || s.device === 'desktop'
                )
              : {}
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
          onBlur={(e) =>
            validateInput(e.target.value, element.validations, element.key)
          }
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
          onBlur={(e) =>
            validateInput(e.target.value, element.validations, element.key)
          }
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
          onBlur={(e) =>
            validateInput(e.target.value, element.validations, element.key)
          }
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
    <Form layout="vertical">
      {formElements.map((element, index) => (
        <React.Fragment key={index}>
          {element.type === 'text' && (
            <Form.Item label={element.label}>
              {inputElementAndType(element)}
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
          {element.type === 'radio' && (
            <Form.Item key={index} label={element.label}>
              <Radio.Group options={element.radioOptions || []} />
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
