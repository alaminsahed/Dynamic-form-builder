import { Card, Col, Row } from "antd";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  DraggableItem,
  FormBuilder,
  SelectedElement,
  fields,
} from "./components";
import { IElement } from "./interface/element";

const App = () => {
  const [formElements, setFormElements] = useState<IElement[]>([]);
  return (
    <DndProvider backend={HTML5Backend}>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Form Elements">
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
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Form Preview">
            <FormBuilder
              formElements={formElements}
              setFormElements={setFormElements}
            />
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
