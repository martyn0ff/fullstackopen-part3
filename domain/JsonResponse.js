class JsonResponse {
  status;
  message;

  static newError(message) {
    return new JsonResponse("error", message);
  }

  static newSuccess(message) {
    return new JsonResponse("success", message);
  }

  constructor(status, message) {
    this.status = status;
    this.message = message;
    Object.freeze(this);
  }
}

module.exports = JsonResponse;