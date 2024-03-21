import {
  CloseOutlined,
  DesktopOutlined,
  DownloadOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  MobileOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Modal, Row, Space, Tooltip } from 'antd';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  DraggableItem,
  FormBuilder,
  SelectedElement,
  fields,
  staticFields,
  structures,
} from './components';
import FormPreview from './components/form-preview';
import { IElement } from './interface/element';
const { confirm } = Modal;

const App = () => {
  const [formElements, setFormElements] = useState<IElement[]>([]);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [responsiveView, setResponsiveView] = useState<
    'desktop' | 'mobile' | 'tablet'
  >('desktop');

  const onExport = () => {
    const data = {
      formElements,
      responsiveView,
    };
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(data)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'form.json';
    document.body.appendChild(element);
    element.click();
  };

  const showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be undone',
      onOk() {
        setFormElements([]);
      },
      onCancel() {},
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Form Elements">
            <div>
              <label
                htmlFor="form_fields"
                style={{
                  display: 'block',
                  marginBottom: '10px',
                }}
              >
                <strong>Form Fields</strong>
              </label>
              <Row gutter={[8, 8]}>
                {fields.map((field) => (
                  <Col span={12} key={field.type}>
                    <DraggableItem
                      type={field.type}
                      placeholder={field.title}
                      icon={field.icon}
                    />
                  </Col>
                ))}
              </Row>
            </div>
            <div>
              <label
                htmlFor="form_fields"
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  marginTop: '20px',
                }}
              >
                <strong>Static</strong>
              </label>
              <Row gutter={[8, 8]}>
                {staticFields.map((field) => (
                  <Col span={12} key={field.type}>
                    <DraggableItem
                      type={field.type}
                      placeholder={field.title}
                      icon={field.icon}
                    />
                  </Col>
                ))}
              </Row>
            </div>
            <div
              style={{
                display: 'block',
                marginBottom: '10px',
                marginTop: '20px',
              }}
            >
              <label
                htmlFor="form_fields"
                style={{
                  display: 'block',
                  marginBottom: '10px',
                }}
              >
                <strong>Structure</strong>
              </label>
              <Row gutter={[8, 8]}>
                {structures.map((field) => (
                  <Col span={12} key={field.type}>
                    <DraggableItem
                      type={field.type}
                      placeholder={field.title}
                      icon={field.icon}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <div
            style={{
              margin: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Space>
              <Tooltip title="Desktop">
                <Button
                  onClick={() => setResponsiveView('desktop')}
                  type={responsiveView === 'desktop' ? 'primary' : 'default'}
                  icon={<DesktopOutlined />}
                />
              </Tooltip>
              <Tooltip title="Mobile">
                <Button
                  onClick={() => setResponsiveView('mobile')}
                  type={responsiveView === 'mobile' ? 'primary' : 'default'}
                  icon={<MobileOutlined />}
                />
              </Tooltip>
              <Tooltip title="Tablet">
                <Button
                  onClick={() => setResponsiveView('tablet')}
                  type={responsiveView === 'tablet' ? 'primary' : 'default'}
                  icon={<TabletOutlined />}
                />
              </Tooltip>
            </Space>
            <Space>
              {!isPreview ? (
                <Button
                  onClick={() => {
                    setIsPreview(true);
                    setFormElements((prev) =>
                      prev.map((item) => ({ ...item, active: false }))
                    );
                  }}
                  icon={<EyeOutlined />}
                  disabled={formElements.length === 0}
                >
                  Preview
                </Button>
              ) : (
                <Button
                  onClick={() => setIsPreview(false)}
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
              )}
            </Space>
            <Space>
              {formElements.length > 0 && (
                <>
                  <Tooltip title="Clear Form">
                    <Button
                      onClick={showConfirm}
                      icon={<CloseOutlined />}
                      htmlType="button"
                      type="default"
                      danger
                    />
                  </Tooltip>
                  <Tooltip title="Export JSON">
                    <Button
                      type="default"
                      onClick={onExport}
                      icon={<DownloadOutlined />}
                      htmlType="button"
                    />
                  </Tooltip>
                </>
              )}
            </Space>
          </div>
          <Card
            title={isPreview ? 'Form Preview' : 'Form Builder'}
            style={{
              overflowY: 'scroll',
            }}
          >
            {!isPreview ? (
              <FormBuilder
                formElements={formElements}
                setFormElements={setFormElements}
              />
            ) : (
              <FormPreview formElements={formElements} />
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Selected Element">
            <SelectedElement
              formElements={formElements}
              setFormElements={setFormElements}
            />
          </Card>
        </Col>
      </Row>
    </DndProvider>
  );
};

export default App;
