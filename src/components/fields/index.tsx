import {
  CalendarOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  DownOutlined,
  EditOutlined,
} from '@ant-design/icons';

export const fields = [
  {
    type: 'text',
    icon: <EditOutlined />,
    title: 'Input',
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
