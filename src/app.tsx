import { Button, Card, Col, Row, Space } from 'antd';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  DraggableItem,
  FormBuilder,
  SelectedElement,
  fields,
} from './components';
import { IElement } from './interface/element';
import FormPreview from './components/form-preview';
import { structures } from './components/structure';

const App = () => {
  const [formElements, setFormElements] = useState<IElement[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [responsiveView, setResponsiveView] = useState('desktop');

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
          <div style={{ margin: '10px' }}>
            <Space>
              <Button
                onClick={() => setResponsiveView('desktop')}
                type={responsiveView === 'desktop' ? 'primary' : 'default'}
              >
                Desktop
              </Button>
              <Button
                onClick={() => setResponsiveView('mobile')}
                type={responsiveView === 'mobile' ? 'primary' : 'default'}
              >
                Mobile
              </Button>
              <Button
                onClick={() => setResponsiveView('tablet')}
                type={responsiveView === 'tablet' ? 'primary' : 'default'}
              >
                Tablet
              </Button>
              {!isPreview ? (
                <Button
                  onClick={() => {
                    setIsPreview(true);
                    setFormElements((prev) =>
                      prev.map((item) => ({ ...item, active: false }))
                    );
                  }}
                >
                  Preview
                </Button>
              ) : (
                <Button onClick={() => setIsPreview(false)}>Edit</Button>
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
