import { v4 as uuidv4 } from "uuid";

class NotificationObject {
  message;
  type;
  icon;
  id;

  static newWarning(message) {
    return new NotificationObject(message, "warning", "⚠️");
  }

  static newInfo(message) {
    return new NotificationObject(message, "info", "ℹ️");
  }

  constructor(message, type, icon) {
    this.message = message;
    this.type = type;
    this.icon = icon;
    this.id = uuidv4();
  }
}

export default NotificationObject;