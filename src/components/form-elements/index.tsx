import {
  ArrowsAltOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  DownOutlined,
  EditOutlined,
  OrderedListOutlined,
  CreditCardOutlined,
  FontColorsOutlined,
} from '@ant-design/icons';

export const fields = [
  {
    type: 'text',
    icon: <EditOutlined />,
    title: 'Input',
  },
  {
    type: 'textarea',
    icon: <OrderedListOutlined />,
    title: 'Textarea',
  },
  {
    type: 'checkbox',
    icon: <CheckSquareOutlined />,
    title: 'Checkbox',
  },
  {
    type: 'datepicker',
    icon: <CalendarOutlined />,
    title: 'DatePicker',
  },
  {
    type: 'dropdown',
    icon: <DownOutlined />,
    title: 'Dropdown',
  },
  {
    type: 'radio',
    icon: <CheckCircleOutlined />,
    title: 'Radio',
  },
];

export const staticFields = [
  {
    type: 'header',
    icon: <FontColorsOutlined />,
    title: 'Header',
  },
  {
    type: 'button',
    icon: <ArrowsAltOutlined />,
    title: 'Button',
  },
];

export const structures = [
  {
    type: 'section',
    icon: <CreditCardOutlined />,
    title: 'Section',
  },
];
