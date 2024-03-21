import { Button, Checkbox, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import {
  FormType,
  IElement,
  IElementBtnOptions,
} from '../../../../interface/element';

interface MainFieldOptionsProps {
  handleKeyChange: (value: any, key: string) => void;
  findSelectedElement: IElementBtnOptions | IElement;
}

const MainFieldOptions: React.FC<MainFieldOptionsProps> = ({
  handleKeyChange,
  findSelectedElement,
}) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  const handleAddOption = () => {
    setOptions([...options, { label: '', value: '' }]);
  };

  const handleOptionChange = (
    index: number,
    field: 'label' | 'value',
    value: string,
    type: FormType
  ) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
    handleKeyChange(
      updatedOptions,
      type === 'checkbox'
        ? 'checkboxOptions'
        : type === 'radio'
        ? 'radioOptions'
        : 'dropdownOptions'
    );
  };

  const handleRemoveOption = (index: number, type: FormType) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
    handleKeyChange(
      updatedOptions,
      type === 'checkbox'
        ? 'checkboxOptions'
        : type === 'radio'
        ? 'radioOptions'
        : 'dropdownOptions'
    );
  };

  useEffect(() => {
    if (findSelectedElement.dropdownOptions) {
      setOptions(findSelectedElement.dropdownOptions);
    } else if (findSelectedElement.checkboxOptions) {
      setOptions(findSelectedElement.checkboxOptions);
    } else if (findSelectedElement.radioOptions) {
      setOptions(findSelectedElement.radioOptions);
    } else {
      setOptions([]);
    }
  }, [
    findSelectedElement.dropdownOptions,
    findSelectedElement.id,
    findSelectedElement.checkboxOptions,
    findSelectedElement.radioOptions,
  ]);

  return (
    <>
      <div
        style={{
          marginBottom: '0.5rem',
        }}
      >
        <label
          htmlFor="key"
          style={{ display: 'block', marginBottom: '0.2rem' }}
        >
          Key{' '}
        </label>
        <Input
          placeholder="Enter Key"
          onChange={(e) => handleKeyChange(e.target.value, 'key')}
          value={findSelectedElement.key}
        />
      </div>
      <div
        style={{
          marginBottom: '0.5rem',
        }}
      >
        <label
          htmlFor="label"
          style={{ display: 'block', marginBottom: '0.2rem' }}
        >
          Label
        </label>
        <Input
          placeholder="Enter Label"
          onChange={(e) => handleKeyChange(e.target.value, 'label')}
          value={findSelectedElement.label}
        />
      </div>
      {findSelectedElement.type !== 'checkbox' && (
        <>
          <div
            style={{
              marginBottom: '0.5rem',
            }}
          >
            <label
              htmlFor="placeholder"
              style={{ display: 'block', marginBottom: '0.2rem' }}
            >
              Placeholder
            </label>
            <Input
              placeholder="Enter Placeholder"
              onChange={(e) => handleKeyChange(e.target.value, 'placeholder')}
              value={findSelectedElement.placeholder}
            />
          </div>
          <div
            style={{
              marginBottom: '0.5rem',
            }}
          >
            <label
              htmlFor="style"
              style={{ display: 'block', marginBottom: '0.2rem' }}
            >
              Size
            </label>
            <Select
              defaultValue="medium"
              onChange={(e) => handleKeyChange(e, 'size')}
              value={findSelectedElement.size}
              options={[
                {
                  label: 'Small',
                  value: 'small',
                },
                {
                  label: 'Middle',
                  value: 'middle',
                },
                {
                  label: 'Large',
                  value: 'large',
                },
              ]}
              style={{
                width: '100%',
              }}
            />
          </div>
        </>
      )}
      {findSelectedElement.type === 'textarea' && (
        <>
          <div
            style={{
              marginBottom: '0.5rem',
            }}
          >
            <label
              htmlFor="autoSize"
              style={{
                display: 'block',
                marginBottom: '0.2rem',
              }}
            >
              Auto Size
            </label>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
              }}
            >
              <Input
                placeholder="Enter Min Rows"
                onChange={(e) =>
                  handleKeyChange(
                    {
                      ...findSelectedElement.autoSize,
                      minRows: e.target.value,
                    },
                    'autoSize'
                  )
                }
                value={findSelectedElement.autoSize?.minRows}
              />
              <Input
                placeholder="Enter Max Rows"
                onChange={(e) =>
                  handleKeyChange(
                    {
                      ...findSelectedElement.autoSize,
                      maxRows: e.target.value,
                    },
                    'autoSize'
                  )
                }
                value={findSelectedElement.autoSize?.maxRows}
              />
            </div>
          </div>
        </>
      )}
      {findSelectedElement.type === 'text' && (
        <>
          <div
            style={{
              marginBottom: '0.5rem',
            }}
          >
            <label
              htmlFor="style"
              style={{ display: 'block', marginBottom: '0.2rem' }}
            >
              Value
            </label>
            <Input
              placeholder="Enter Value"
              onChange={(e) => handleKeyChange(e.target.value, 'value')}
              value={findSelectedElement.value}
            />
          </div>
          <div
            style={{
              marginBottom: '0.5rem',
            }}
          >
            <label
              htmlFor="style"
              style={{ display: 'block', marginBottom: '0.2rem' }}
            >
              Type
            </label>
            <Select
              defaultValue="text"
              onChange={(e) => handleKeyChange(e, 'inputType')}
              value={findSelectedElement.inputType}
              options={[
                {
                  label: 'Text',
                  value: 'text',
                },
                {
                  label: 'Password',
                  value: 'password',
                },
                {
                  label: 'Number',
                  value: 'number',
                },
                {
                  label: 'Search',
                  value: 'search',
                },
                {
                  label: 'URL',
                  value: 'url',
                },
              ]}
              style={{
                width: '100%',
              }}
            />
          </div>
        </>
      )}
      {(findSelectedElement.type === 'textarea' ||
        findSelectedElement.type === 'text' ||
        findSelectedElement.type === 'datepicker') && (
        <div
          style={{
            marginBottom: '0.5rem',
          }}
        >
          <Checkbox
            checked={(findSelectedElement as IElement).disabled}
            onChange={(e) => handleKeyChange(e.target.checked, 'disabled')}
          >
            {' '}
            Disabled{' '}
          </Checkbox>
        </div>
      )}
      {findSelectedElement.type === 'datepicker' && (
        <div
          style={{
            marginBottom: '0.5rem',
          }}
        >
          <Checkbox
            checked={(findSelectedElement as IElement).showTime}
            onChange={(e) => handleKeyChange(e.target.checked, 'showTime')}
          >
            {' '}
            Showtime{' '}
          </Checkbox>
        </div>
      )}
      {findSelectedElement.type === 'textarea' && (
        <div
          style={{
            marginBottom: '0.5rem',
          }}
        >
          <Checkbox
            checked={(findSelectedElement as IElement).showCount}
            onChange={(e) => handleKeyChange(e.target.checked, 'showCount')}
          >
            {' '}
            Show Count
          </Checkbox>
        </div>
      )}
      {findSelectedElement.inputType === 'password' && (
        <div
          style={{
            marginBottom: '0.5rem',
          }}
        >
          <Checkbox
            checked={(findSelectedElement as IElement).passwordMask}
            onChange={(e) => handleKeyChange(e.target.checked, 'passwordMask')}
          >
            {' '}
            Password Mask{' '}
          </Checkbox>
        </div>
      )}
      {findSelectedElement.type === 'button' && (
        <>
          <label
            htmlFor="style"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            Appearance
          </label>
          <Select
            defaultValue="primary"
            onChange={(e) => handleKeyChange(e, 'appearance')}
            value={(findSelectedElement as IElementBtnOptions).appearance}
            options={[
              {
                label: 'Primary',
                value: 'primary',
              },
              {
                label: 'Dashed',
                value: 'dashed',
              },
              {
                label: 'Link',
                value: 'link',
              },
              {
                label: 'Text',
                value: 'text',
              },
              {
                label: 'Default',
                value: 'default',
              },
            ]}
            style={{
              width: '100%',
            }}
          />
          <label
            htmlFor="style"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            href
          </label>
          <Input
            placeholder="Enter link"
            onChange={(e) => handleKeyChange(e.target.value, 'href')}
            value={(findSelectedElement as IElementBtnOptions).href}
          />
          <label
            htmlFor="style"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            htmlType
          </label>
          <Select
            defaultValue="button"
            onChange={(e) => handleKeyChange(e, 'htmlType')}
            value={(findSelectedElement as IElementBtnOptions).htmlType}
            options={[
              {
                label: 'Button',
                value: 'button',
              },
              {
                label: 'Submit',
                value: 'submit',
              },
              {
                label: 'Reset',
                value: 'reset',
              },
            ]}
            style={{
              width: '100%',
              marginBottom: '0.5rem',
            }}
          />
          <label
            htmlFor="style"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            Shape
          </label>
          <Select
            defaultValue="default"
            onChange={(e) => handleKeyChange(e, 'shape')}
            value={(findSelectedElement as IElementBtnOptions).shape}
            options={[
              {
                label: 'Circle',
                value: 'circle',
              },
              {
                label: 'Round',
                value: 'round',
              },
              {
                label: 'Default',
                value: 'default',
              },
            ]}
            style={{
              width: '100%',
              marginBottom: '0.5rem',
            }}
          />
          <Checkbox
            checked={(findSelectedElement as IElementBtnOptions).ghost}
            onChange={(e) => handleKeyChange(e.target.checked, 'ghost')}
          >
            Ghost
          </Checkbox>
          <Checkbox
            checked={(findSelectedElement as IElementBtnOptions).danger}
            onChange={(e) => handleKeyChange(e.target.checked, 'danger')}
          >
            {' '}
            Danger{' '}
          </Checkbox>
          <Checkbox
            checked={(findSelectedElement as IElementBtnOptions).disabled}
            onChange={(e) => handleKeyChange(e.target.checked, 'disabled')}
          >
            {' '}
            Disabled{' '}
          </Checkbox>
          <Checkbox
            checked={(findSelectedElement as IElementBtnOptions).block}
            onChange={(e) => handleKeyChange(e.target.checked, 'block')}
          >
            {' '}
            Block{' '}
          </Checkbox>
        </>
      )}
      {(findSelectedElement.type === 'dropdown' ||
        findSelectedElement.type === 'checkbox' ||
        findSelectedElement.type === 'radio') && (
        <>
          <label
            htmlFor="options"
            style={{ display: 'block', marginBottom: '0.5rem' }}
          >
            Options
          </label>
          {options.map((option, index) => (
            <div
              key={index}
              style={{
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Space>
                <Input
                  placeholder="label"
                  value={option.label}
                  onChange={(e) =>
                    handleOptionChange(
                      index,
                      'label',
                      e.target.value,
                      findSelectedElement.type
                    )
                  }
                />
                <Input
                  placeholder="Value"
                  value={option.value}
                  onChange={(e) =>
                    handleOptionChange(
                      index,
                      'value',
                      e.target.value,
                      findSelectedElement.type
                    )
                  }
                />
                <Button
                  type="text"
                  danger
                  onClick={() =>
                    handleRemoveOption(index, findSelectedElement.type)
                  }
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
