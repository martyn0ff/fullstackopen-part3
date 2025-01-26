class JsonResponse {
  status;
  message;
  errorType;

  static newError(errorType, message) {
    return new JsonResponse("error", message, errorType);
  }

  static newSuccess(message) {
    return new JsonResponse("success", message);
  }

  constructor(status, message, errorType) {
    this.status = status;
    this.message = message;
    if (errorType) {
      this.errorType = errorType;
    }
    else {
      delete this.errorType;
    }
    Object.freeze(this);
  }
}

module.exports = JsonResponse;