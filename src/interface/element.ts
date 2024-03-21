export interface IElement {
  id?: number;
  key?: string;
  type: FormType;
  placeholder?: string;
  className?: string;
  style?: any;
  active?: boolean;
  label?: string;
  value?: string;
  size?: 'small' | 'middle' | 'large';
  index: number | string;
  width?: string;
  validations?: any;
  device?: string;
  dropdownOptions?: any;
  checkboxOptions?: any;
  radioOptions?: any;
  inputType?: 'text' | 'password' | 'number' | 'search' | 'url';
  passwordMask?: boolean;
  disabled?: boolean;
  showCount?: boolean;
  autoSize?: {
    minRows: number;
    maxRows: number;
  };
  showTime?: boolean;
  headerLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface IElementBtnOptions extends IElement {
  block: boolean;
  danger: boolean;
  disabled: boolean;
  ghost: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  appearance: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  shape: 'default' | 'circle' | 'round';
  loading?: boolean;
  href?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  target?: '_self' | '_blank' | '_parent' | '_top';
}

export type FormType =
  | 'text'
  | 'radio'
  | 'checkbox'
  | 'dropdown'
  | 'textarea'
  | 'datepicker'
  | 'button'
  | 'header'
  | 'container';
