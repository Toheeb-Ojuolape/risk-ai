// import { IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { NOTIFICATION_ERROR, NOTIFICATION_SUCCESS } from "../constants";

export const handleSuccess = (message) => {
  return notifications.show({
    ...NOTIFICATION_SUCCESS,
    message,
  });
};

export const handleErrors = (message) => {
  if (Array.isArray(message)) {
    return notifications.show({
      ...NOTIFICATION_ERROR,
      message: message[0].msg,
    });
  }
  if (typeof message == "string") {
    return notifications.show({ ...NOTIFICATION_ERROR, message });
  }
};
