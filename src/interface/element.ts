export interface IElement {
  id?: number;
  key?: string;
  type: "text" | "radio" | "checkbox" | "dropdown" | "textarea" | "datepicker";
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  active?: boolean;
  label?: string;
  value?: string;
  size?: "small" | "middle" | "large";
  index: any;
  width?: any;
  validations?: any;
}
