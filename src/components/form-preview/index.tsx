import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from 'antd';
import React, { useState } from 'react';
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
      {formElements.length > 0 ? (
        formElements.map((element, index) => (
          <React.Fragment key={index}>
            {element.type === 'text' && (
              <Form.Item label={element.label}>
                {inputElementAndType(element)}
                {formErrors[element.key] && (
                  <div style={{ color: 'red' }}>{formErrors[element.key]}</div>
                )}
              </Form.Item>
            )}
            {element.type === 'textarea' && (
              <Form.Item label={element.label}>
                <Input.TextArea
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
                  disabled={element.disabled}
                  showCount={element?.showCount || false}
                  autoSize={element?.autoSize || { minRows: 3, maxRows: 5 }}
                />
                {formErrors[element.key] && (
                  <div style={{ color: 'red' }}>{formErrors[element.key]}</div>
                )}
              </Form.Item>
            )}
            {element.type === 'datepicker' && (
              <Form.Item label={element.label}>
                <DatePicker
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
                      : {
                          width: '100%',
                        }
                  }
                  disabled={element.disabled}
                  showTime={element.showTime}
                  format={
                    element.showTime ? 'YYYY-MM-DD hh:mm A' : 'YYYY-MM-DD'
                  }
                />
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
            {element.type === 'header' && (
              <Form.Item key={index}>
                {element.headerLevel === 'h1' && <h1>{element.label}</h1>}
                {element.headerLevel === 'h2' && <h2>{element.label}</h2>}
                {element.headerLevel === 'h3' && <h3>{element.label}</h3>}
                {element.headerLevel === 'h4' && <h4>{element.label}</h4>}
                {element.headerLevel === 'h5' && <h5>{element.label}</h5>}
                {element.headerLevel === 'h6' && <h6>{element.label}</h6>}
              </Form.Item>
            )}
            {element.type === 'container' && (
              <>
                <label
                  htmlFor="container"
                  style={{
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  {element.label}
                </label>
                <div
                  key={element.id}
                  style={{
                    padding: '20px',
                    border: '1px solid #d6cfcf',
                    borderRadius: '5px',
                    marginBottom: '10px',
                  }}
                >
                  {element.children ? (
                    <Row gutter={[8, 8]}>
                      {element.children.map((child) => (
                        <Col
                          key={child.id}
                          span={element.grid * 2 || 12}
                          style={{
                            border: child.active ? '2px dashed blue' : 'none',
                            padding: child.active ? '10px' : '5px',
                            borderRadius: '5px',
                            position: 'relative',
                            transition: '200ms all ease-in-out',
                          }}
                        >
                          {child.type === 'text' && (
                            <Form.Item
                              style={{ marginBottom: 0 }}
                              key={child.id}
                              label={child.label}
                            >
                              {inputElementAndType(child)}
                            </Form.Item>
                          )}
                        </Col>
                      ))}
                    </Row>
                  ) : null}
                </div>
              </>
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
    </Form>
  );
};

export default FormPreview;
