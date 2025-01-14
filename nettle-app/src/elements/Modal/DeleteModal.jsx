/* eslint-disable react/prop-types */
import { Modal, Button, Text } from "@mantine/core";

function DeleteModal({
  title,
  description,
  opened,
  loading,
  btnTitle,
  handleClick,
  close,
}) {
  return (
    <Modal opened={opened} onClose={close} title={title}>
      <Text my={"md"}>{description}</Text>

      <Button loading={loading} onClick={handleClick}>
        {btnTitle}
      </Button>
    </Modal>
  );
}

export default DeleteModal;
