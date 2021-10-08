import React, { ReactNode } from 'react';
import { Button, Form, Header, Icon, Popup } from 'semantic-ui-react';

type Props = {
  groupName: string;
  itemName: string;
  items: Array<{id: string}>;
  children: (id: string, index: number) => ReactNode;
  onAdd: VoidFunction;
  onRemove: (id: string) => void;
};

export default function DynamicFormGroupBuilder({
  children,
  groupName,
  itemName,
  items,
  onAdd,
  onRemove,
}: Props) {
  return (
    <>
      <Header>{groupName}</Header>
      {items.map(({ id }, index) => (
        <Form.Group widths="equal" key={id}>
          {children(id, index)}
          <Popup
            position="right center"
            trigger={
              <Form.Button
                icon
                width="one"
                label="&nbsp;"
                onClick={() => onRemove(id)}
              >
                <Icon name="minus" />
              </Form.Button>
            }
          >
            Remove {itemName}
          </Popup>
        </Form.Group>
      ))}
      <Popup
        position="right center"
        trigger={
          <Button type="button" icon onClick={onAdd}>
            <Icon name="add" />
          </Button>
        }
      >
        Add {itemName}
      </Popup>
    </>
  );
};
