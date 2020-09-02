import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

function SimpleModal({children, headerText, width = 400, contentText, onConfirmClick}) {
  const [open, setOpen] = React.useState(false);

  const handleConfirm = () => {
    setOpen(false);
    onConfirmClick();
  }

  return (
    <Modal
      style={{width: `${width}px`}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={children}
    >
      {headerText ? <Modal.Header>{headerText}</Modal.Header> : null}
      {contentText ?  (
        <Modal.Content>
          <Modal.Description>{contentText}</Modal.Description>
        </Modal.Content>
      ) : null}

      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>Нет</Button>
        <Button
          content="Да"
          onClick={() => handleConfirm()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default SimpleModal;