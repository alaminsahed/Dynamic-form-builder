import {
  ArrowsAltOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  DownOutlined,
  EditOutlined,
  FontColorsOutlined,
  InsertRowAboveOutlined,
  MinusOutlined,
  OrderedListOutlined,
  SwapOutlined,
  UploadOutlined,
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
  {
    type: 'upload',
    icon: <UploadOutlined />,
    title: 'Upload',
  },
  {
    type: 'switch',
    icon: <SwapOutlined />,
    title: 'Switch',
  },
  {
    type: 'slider',
    icon: <MinusOutlined />,
    title: 'Slider',
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
    type: 'container',
    icon: <InsertRowAboveOutlined />,
    title: 'Container',
  },
];
